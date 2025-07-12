// Optimized Analytics with Lazy Loading and Performance Enhancements
class OptimizedAnalyticsManager {
  constructor() {
    this.initialized = false
    this.pendingEvents = []
    this.debouncedEvents = new Map()
    this.eventQueue = []
    this.isProcessingQueue = false
    this.gameStartTime = null
    this.sessionData = {
      startTime: Date.now(),
      pageViews: 0,
      gameInteractions: 0,
      totalGameTime: 0
    }
    
    // Performance monitoring removed as per user request
    
    // Lazy initialization flag
    this.shouldInit = false
    
    // Setup lazy initialization triggers
    this.setupLazyInit()
  }

  // Setup triggers for lazy analytics initialization
  setupLazyInit() {
    if (typeof window === 'undefined') return

    // Initialize analytics on first user interaction
    const interactionEvents = ['mousedown', 'touchstart', 'keydown', 'scroll']
    const initOnInteraction = () => {
      if (!this.shouldInit) {
        this.shouldInit = true
        this.delayedInit()
        interactionEvents.forEach(event => {
          window.removeEventListener(event, initOnInteraction, { passive: true })
        })
      }
    }

    interactionEvents.forEach(event => {
      window.addEventListener(event, initOnInteraction, { passive: true })
    })

    // Also initialize after page load with delay
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (!this.shouldInit) {
          this.shouldInit = true
          this.delayedInit()
        }
      }, 2000) // 2 second delay after page load
    })
  }

  // Delayed initialization for better performance
  async delayedInit() {
    if (this.initialized) return

    // Wait for browser idle time
    await this.waitForIdle()
    
    const initStartTime = performance.now()
    
    try {
      // Initialize in chunks to avoid blocking
      await this.initGoogleAnalytics()
      await this.sleep(100)
      await this.initGoogleAds()
      await this.sleep(100)
      
      this.initialized = true
      
      // Process any pending events
      this.processPendingEvents()
      
      console.log('Optimized Analytics initialized at', initStartTime, 'ms')
    } catch (error) {
      console.warn('Analytics initialization failed:', error)
    }
  }

  // Wait for browser idle time
  waitForIdle() {
    return new Promise(resolve => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(resolve, { timeout: 1000 })
      } else {
        setTimeout(resolve, 0)
      }
    })
  }

  // Sleep utility for non-blocking delays
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Optimized Google Analytics initialization
  async initGoogleAnalytics() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TGVJVCTQBE'
      
      script.onload = () => {
        // Initialize dataLayer and gtag
        window.dataLayer = window.dataLayer || []
        function gtag() { window.dataLayer.push(arguments) }
        gtag('js', new Date())
        gtag('config', 'G-TGVJVCTQBE', {
          page_title: document.title,
          page_location: window.location.href,
          send_page_view: false // We'll handle page views manually
        })
        
        window.gtag = gtag
        resolve()
      }
      
      script.onerror = () => reject(new Error('Failed to load Google Analytics'))
      document.head.appendChild(script)
    })
  }

  // Optimized Google AdSense initialization
  async initGoogleAds() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.async = true
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9114241331557514'
      script.crossOrigin = 'anonymous'
      
      script.onload = () => {
        // Initialize AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        resolve()
      }
      
      script.onerror = () => {
        console.warn('AdSense failed to load')
        resolve() // Don't fail the entire init for ads
      }
      
      document.head.appendChild(script)
    })
  }

  // Performance monitoring removed as per user request

  // Debounced event tracking
  trackEventDebounced(eventName, parameters = {}, delay = 300) {
    const key = `${eventName}_${JSON.stringify(parameters)}`
    
    // Clear existing timeout
    if (this.debouncedEvents.has(key)) {
      clearTimeout(this.debouncedEvents.get(key))
    }
    
    // Set new timeout
    const timeout = setTimeout(() => {
      this.trackEvent(eventName, parameters)
      this.debouncedEvents.delete(key)
    }, delay)
    
    this.debouncedEvents.set(key, timeout)
  }

  // Optimized event tracking with queue
  trackEvent(eventName, parameters = {}) {
    const event = {
      name: eventName,
      parameters: {
        ...parameters,
        timestamp: Date.now(),
        session_id: this.sessionData.startTime
      }
    }

    if (!this.initialized) {
      this.pendingEvents.push(event)
      return
    }

    this.eventQueue.push(event)
    this.processEventQueue()
  }

  // Process event queue in batches
  async processEventQueue() {
    if (this.isProcessingQueue || this.eventQueue.length === 0) return
    
    this.isProcessingQueue = true
    
    try {
      while (this.eventQueue.length > 0) {
        const batch = this.eventQueue.splice(0, 5) // Process 5 events at a time
        
        for (const event of batch) {
          if (window.gtag) {
            window.gtag('event', event.name, event.parameters)
          }
        }
        
        // Small delay between batches
        if (this.eventQueue.length > 0) {
          await this.sleep(50)
        }
      }
    } catch (error) {
      console.warn('Event tracking failed:', error)
    } finally {
      this.isProcessingQueue = false
    }
  }

  // Process pending events after initialization
  processPendingEvents() {
    if (this.pendingEvents.length === 0) return
    
    this.eventQueue.push(...this.pendingEvents)
    this.pendingEvents = []
    this.processEventQueue()
  }

  // Enhanced tracking methods with debouncing
  trackPageView(pageName) {
    this.sessionData.pageViews++
    this.trackEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_name: pageName,
      page_view_count: this.sessionData.pageViews
    })
  }

  trackGameStart(gameName, gameId = null) {
    this.gameStartTime = performance.now()
    this.sessionData.gameInteractions++
    
    this.trackEventDebounced('game_start', {
      game_name: gameName,
      game_id: gameId,
      session_game_count: this.sessionData.gameInteractions
    }, 100)
  }

  trackGameEnd(gameName, gameId = null) {
    if (this.gameStartTime) {
      const gameTime = performance.now() - this.gameStartTime
      this.sessionData.totalGameTime += gameTime
      
      this.trackEvent('game_end', {
        game_name: gameName,
        game_id: gameId,
        game_duration: Math.round(gameTime),
        total_game_time: Math.round(this.sessionData.totalGameTime)
      })
      
      this.gameStartTime = null
    }
  }

  trackGameCategory(category) {
    this.trackEventDebounced('game_category_view', {
      category: category,
      timestamp: Date.now()
    }, 500)
  }

  trackSearchQuery(query) {
    if (!query || query.length < 2) return
    
    this.trackEventDebounced('search', {
      search_term: query.toLowerCase(),
      search_length: query.length
    }, 1000)
  }

  // Performance metrics tracking removed as per user request

  // Session summary tracking
  trackSessionSummary() {
    this.trackEvent('session_summary', {
      session_duration: Date.now() - this.sessionData.startTime,
      page_views: this.sessionData.pageViews,
      game_interactions: this.sessionData.gameInteractions,
      total_game_time: Math.round(this.sessionData.totalGameTime)
    })
  }

  // Cleanup method
  cleanup() {
    // Clear all debounced events
    this.debouncedEvents.forEach(timeout => clearTimeout(timeout))
    this.debouncedEvents.clear()
    
    // Track session summary before cleanup
    if (this.initialized) {
      this.trackSessionSummary()
    }
  }
}

// Create singleton instance
const analytics = new OptimizedAnalyticsManager()

// Auto-cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    analytics.cleanup()
  })
}

// Export both the instance and the class
export { analytics, OptimizedAnalyticsManager }
export default analytics