// Intelligent preloading utilities for better performance
export class PreloadManager {
  constructor() {
    this.preloaded = new Set()
    this.prefetchQueue = []
    this.isPreloading = false
  }

  // Preload route components on hover
  async preloadRoute(routeName) {
    if (this.preloaded.has(routeName)) {
      return
    }

    try {
      switch (routeName) {
        case 'games':
          await import(/* webpackChunkName: "games-list" */ '../views/GamesListView.vue')
          break
        case 'game':
          await import(/* webpackChunkName: "game-detail" */ '../views/GameDetailView.vue')
          break
        case 'category':
          await import(/* webpackChunkName: "category" */ '../views/CategoryView.vue')
          break
        default:
          return
      }
      this.preloaded.add(routeName)
    } catch (error) {
      console.warn(`Failed to preload route ${routeName}:`, error)
    }
  }

  // Preload critical components after page load
  async preloadCriticalComponents() {
    if (this.isPreloading) return
    this.isPreloading = true

    // Wait for idle time before preloading
    await this.waitForIdle()

    const components = [
      () => import(/* webpackChunkName: "game-components" */ '../components/game/GameIframe.vue'),
      () => import(/* webpackChunkName: "game-components" */ '../components/game/RelatedGames.vue'),
      () => import(/* webpackChunkName: "ui-components" */ '../components/GameCard.vue')
    ]

    for (const componentLoader of components) {
      try {
        await componentLoader()
        // Small delay between loads to avoid blocking
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (error) {
        console.warn('Failed to preload component:', error)
      }
    }

    this.isPreloading = false
  }

  // Wait for browser idle time
  waitForIdle() {
    return new Promise(resolve => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(resolve, { timeout: 2000 })
      } else {
        setTimeout(resolve, 100)
      }
    })
  }

  // Preload images on intersection
  setupImagePreloading() {
    if (!('IntersectionObserver' in window)) return

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.classList.remove('lazy')
            imageObserver.unobserve(img)
          }
        }
      })
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    })

    // Observe all lazy images
    document.querySelectorAll('img.lazy').forEach(img => {
      imageObserver.observe(img)
    })

    return imageObserver
  }

  // Prefetch next likely routes based on user behavior
  predictAndPrefetch(currentRoute) {
    const predictions = {
      'Home': ['games', 'game'],
      'GamesList': ['game', 'category'],
      'GameDetail': ['games', 'game'],
      'Category': ['game', 'games']
    }

    const nextRoutes = predictions[currentRoute] || []
    nextRoutes.forEach(route => {
      this.addToPrefetchQueue(route)
    })

    this.processPrefetchQueue()
  }

  addToPrefetchQueue(route) {
    if (!this.prefetchQueue.includes(route) && !this.preloaded.has(route)) {
      this.prefetchQueue.push(route)
    }
  }

  async processPrefetchQueue() {
    if (this.prefetchQueue.length === 0) return

    // Process one item from queue
    const route = this.prefetchQueue.shift()
    await this.preloadRoute(route)

    // Continue processing after delay
    if (this.prefetchQueue.length > 0) {
      setTimeout(() => this.processPrefetchQueue(), 1000)
    }
  }
}

// Create singleton instance
export const preloadManager = new PreloadManager()

// Auto-setup when imported
if (typeof window !== 'undefined') {
  // Setup image preloading when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadManager.setupImagePreloading()
    })
  } else {
    preloadManager.setupImagePreloading()
  }

  // Start preloading critical components after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloadManager.preloadCriticalComponents()
    }, 1000)
  })
}