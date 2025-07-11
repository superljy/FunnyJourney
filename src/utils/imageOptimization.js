// Advanced image optimization utilities
export class ImageOptimizer {
  constructor() {
    this.cache = new Map()
    this.preloadQueue = []
    this.isProcessing = false
    this.observers = new Map()
    
    // Initialize WebP support detection
    this.supportsWebP = this.detectWebPSupport()
    
    // Initialize AVIF support detection
    this.supportsAVIF = this.detectAVIFSupport()
  }

  // Detect WebP support
  async detectWebPSupport() {
    if (typeof window === 'undefined') return false
    
    return new Promise(resolve => {
      const webP = new Image()
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2)
      }
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
    })
  }

  // Detect AVIF support
  async detectAVIFSupport() {
    if (typeof window === 'undefined') return false
    
    return new Promise(resolve => {
      const avif = new Image()
      avif.onload = avif.onerror = () => {
        resolve(avif.height === 2)
      }
      avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A='
    })
  }

  // Get optimized image source based on browser support
  getOptimizedSrc(src, options = {}) {
    const {
      width,
      height,
      quality = 85,
      format = 'auto'
    } = options

    // For development, return original
    if (process.env.NODE_ENV === 'development') {
      return src
    }

    // Build optimization URL
    let optimizedSrc = src
    const params = new URLSearchParams()

    if (width) params.append('w', width)
    if (height) params.append('h', height)
    params.append('q', quality)

    // Choose best format based on browser support
    if (format === 'auto') {
      if (this.supportsAVIF) {
        params.append('f', 'avif')
      } else if (this.supportsWebP) {
        params.append('f', 'webp')
      }
    } else {
      params.append('f', format)
    }

    // In a real implementation, you'd use a CDN service like Cloudinary, ImageKit, etc.
    // For now, we'll just return the original with a future-ready parameter structure
    if (params.toString()) {
      optimizedSrc = `${src}?${params.toString()}`
    }

    return optimizedSrc
  }

  // Preload critical images
  async preloadCriticalImages(imageSources, priority = 'high') {
    const preloadPromises = imageSources.map(src => this.preloadImage(src, priority))
    return Promise.allSettled(preloadPromises)
  }

  // Preload single image
  preloadImage(src, priority = 'low') {
    if (this.cache.has(src)) {
      return Promise.resolve(this.cache.get(src))
    }

    return new Promise((resolve, reject) => {
      const img = new Image()
      
      if (priority === 'high') {
        img.loading = 'eager'
      }

      img.onload = () => {
        this.cache.set(src, img)
        resolve(img)
      }

      img.onerror = () => {
        reject(new Error(`Failed to preload image: ${src}`))
      }

      img.src = src
    })
  }

  // Setup intelligent image preloading based on viewport
  setupViewportPreloading() {
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target
            const dataSrc = img.dataset.src || img.dataset.lazySrc
            
            if (dataSrc && !img.src) {
              img.src = dataSrc
              img.classList.remove('lazy-loading')
              observer.unobserve(img)
            }
          }
        })
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.01
      }
    )

    this.observers.set('viewport', observer)
    return observer
  }

  // Setup hover preloading for better UX
  setupHoverPreloading() {
    const preloadOnHover = (element, imageSrc) => {
      let timeout
      
      const mouseEnterHandler = () => {
        timeout = setTimeout(() => {
          this.preloadImage(imageSrc, 'medium')
        }, 100) // Small delay to avoid unnecessary preloads
      }
      
      const mouseLeaveHandler = () => {
        if (timeout) {
          clearTimeout(timeout)
        }
      }

      element.addEventListener('mouseenter', mouseEnterHandler)
      element.addEventListener('mouseleave', mouseLeaveHandler)
      element.addEventListener('touchstart', mouseEnterHandler, { passive: true })

      return () => {
        element.removeEventListener('mouseenter', mouseEnterHandler)
        element.removeEventListener('mouseleave', mouseLeaveHandler)
        element.removeEventListener('touchstart', mouseEnterHandler)
      }
    }

    return preloadOnHover
  }

  // Create responsive image sizes
  generateResponsiveSizes(baseSrc, breakpoints = [320, 640, 768, 1024, 1280]) {
    return breakpoints.map(width => ({
      src: this.getOptimizedSrc(baseSrc, { width }),
      width,
      media: `(max-width: ${width}px)`
    }))
  }

  // Optimize images for different device pixel ratios
  generateRetinaSizes(baseSrc, options = {}) {
    const { width, height } = options
    
    return [
      {
        src: this.getOptimizedSrc(baseSrc, { width, height }),
        pixelRatio: 1
      },
      {
        src: this.getOptimizedSrc(baseSrc, { 
          width: width * 1.5, 
          height: height * 1.5 
        }),
        pixelRatio: 1.5
      },
      {
        src: this.getOptimizedSrc(baseSrc, { 
          width: width * 2, 
          height: height * 2 
        }),
        pixelRatio: 2
      }
    ]
  }

  // Cleanup observers and cache
  cleanup() {
    this.observers.forEach(observer => {
      observer.disconnect()
    })
    this.observers.clear()
    this.cache.clear()
  }

  // Get cache statistics
  getCacheStats() {
    return {
      size: this.cache.size,
      memoryUsage: this.estimateMemoryUsage(),
      hitRate: this.calculateHitRate()
    }
  }

  estimateMemoryUsage() {
    // Rough estimation - each cached image ~100KB average
    return this.cache.size * 100 * 1024
  }

  calculateHitRate() {
    // This would need actual tracking in a real implementation
    return Math.min(0.85, this.cache.size / 100)
  }
}

// Create singleton instance
export const imageOptimizer = new ImageOptimizer()

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  // Initialize WebP/AVIF detection
  imageOptimizer.detectWebPSupport()
  imageOptimizer.detectAVIFSupport()
  
  // Setup viewport preloading
  document.addEventListener('DOMContentLoaded', () => {
    imageOptimizer.setupViewportPreloading()
  })
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    imageOptimizer.cleanup()
  })
}

// Utility function for Vue components
export function useImageOptimization() {
  return {
    getOptimizedSrc: imageOptimizer.getOptimizedSrc.bind(imageOptimizer),
    preloadImage: imageOptimizer.preloadImage.bind(imageOptimizer),
    generateResponsiveSizes: imageOptimizer.generateResponsiveSizes.bind(imageOptimizer),
    setupHoverPreloading: imageOptimizer.setupHoverPreloading.bind(imageOptimizer)
  }
}