<template>
  <div class="optimized-image-container">
    <img
      ref="imageRef"
      :src="imageSrc"
      :alt="alt"
      :class="imageClass"
      :loading="loading"
      :decoding="decoding"
      @load="onLoad"
      @error="onError"
      @intersect="onIntersect"
    />
    
    <!-- Loading placeholder -->
    <div v-if="isLoading" class="image-placeholder">
      <div class="loading-spinner"></div>
    </div>
    
    <!-- Error fallback -->
    <div v-if="hasError" class="image-error">
      <div class="error-icon">🖼️</div>
      <p class="error-text">Image failed to load</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OptimizedImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    lazy: {
      type: Boolean,
      default: true
    },
    blur: {
      type: Boolean,
      default: true
    },
    responsive: {
      type: Boolean,
      default: true
    },
    priority: {
      type: Boolean,
      default: false
    },
    quality: {
      type: Number,
      default: 85,
      validator: (value) => value >= 1 && value <= 100
    }
  },
  data() {
    return {
      isLoading: true,
      hasError: false,
      imageSrc: '',
      observer: null,
      isIntersecting: false
    }
  },
  computed: {
    loading() {
      return this.priority ? 'eager' : 'lazy'
    },
    decoding() {
      return this.priority ? 'sync' : 'async'
    },
    imageClass() {
      return {
        'optimized-image': true,
        'loading': this.isLoading,
        'error': this.hasError,
        'blur': this.blur && this.isLoading,
        'responsive': this.responsive
      }
    },
    optimizedSrc() {
      if (!this.src) return ''
      
      // Generate optimized image URL
      const params = new URLSearchParams()
      
      if (this.width) params.append('w', this.width)
      if (this.height) params.append('h', this.height)
      params.append('q', this.quality)
      params.append('f', 'webp')
      
      // For development, just return the original src
      if (process.env.NODE_ENV === 'development') {
        return this.src
      }
      
      // In production, you might want to use a CDN or image optimization service
      // For now, just return the original src
      return this.src
    }
  },
  mounted() {
    this.setupImageLoading()
  },
  beforeUnmount() {
    this.cleanup()
  },
  methods: {
    setupImageLoading() {
      if (this.priority) {
        // High priority images load immediately
        this.loadImage()
      } else if (this.lazy) {
        // Set up intersection observer for lazy loading
        this.setupIntersectionObserver()
      } else {
        // Normal loading
        this.loadImage()
      }
    },
    
    setupIntersectionObserver() {
      if (!window.IntersectionObserver) {
        // Fallback for older browsers
        this.loadImage()
        return
      }
      
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.isIntersecting = true
              this.loadImage()
              this.observer.unobserve(entry.target)
            }
          })
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      )
      
      this.observer.observe(this.$refs.imageRef)
    },
    
    loadImage() {
      if (!this.src) return
      
      // Create a new image to preload
      const img = new Image()
      
      img.onload = () => {
        this.imageSrc = this.optimizedSrc
        this.isLoading = false
        this.hasError = false
        this.$emit('load', img)
      }
      
      img.onerror = () => {
        this.hasError = true
        this.isLoading = false
        this.$emit('error', new Error('Image failed to load'))
      }
      
      img.src = this.optimizedSrc
    },
    
    onLoad(event) {
      this.isLoading = false
      this.hasError = false
      this.$emit('load', event)
    },
    
    onError(event) {
      this.hasError = true
      this.isLoading = false
      this.$emit('error', event)
    },
    
    onIntersect() {
      if (!this.isIntersecting) {
        this.isIntersecting = true
        this.loadImage()
      }
    },
    
    cleanup() {
      if (this.observer) {
        this.observer.disconnect()
      }
    }
  }
}
</script>

<style scoped>
.optimized-image-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.optimized-image {
  display: block;
  transition: opacity 0.3s ease, filter 0.3s ease;
}

.optimized-image.responsive {
  width: 100%;
  height: auto;
}

.optimized-image.loading {
  opacity: 0;
}

.optimized-image.blur {
  filter: blur(5px);
}

.optimized-image:not(.loading) {
  opacity: 1;
  filter: none;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 8px;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #e2e8f0;
  border-top: 2px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.image-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 8px;
  text-align: center;
  padding: 1rem;
}

.error-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  opacity: 0.5;
}

.error-text {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}
</style>