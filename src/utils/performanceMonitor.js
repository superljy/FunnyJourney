// Advanced Performance Monitoring System for FunnyJourney
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      vitals: {
        FCP: null, // First Contentful Paint
        LCP: null, // Largest Contentful Paint
        FID: null, // First Input Delay
        CLS: null, // Cumulative Layout Shift
        TTFB: null // Time to First Byte
      },
      navigation: {
        loadTime: null,
        domReadyTime: null,
        renderTime: null
      },
      resources: {
        totalSize: 0,
        imageSize: 0,
        scriptSize: 0,
        styleSize: 0,
        count: 0
      },
      memory: {
        usedJSHeapSize: null,
        totalJSHeapSize: null,
        jsHeapSizeLimit: null
      },
      serviceWorker: {
        cacheHits: 0,
        cacheMisses: 0,
        networkRequests: 0
      },
      userExperience: {
        gameLoads: 0,
        pageViews: 0,
        sessionTime: 0,
        bounceRate: null
      }
    }
    
    this.observers = new Map()
    this.startTime = performance.now()
    this.sessionStart = Date.now()
    
    this.init()
  }

  init() {
    // Initialize all monitoring
    this.initCoreWebVitals()
    this.initNavigationTiming()
    this.initResourceTiming()
    this.initMemoryMonitoring()
    this.initServiceWorkerMetrics()
    this.initUserExperienceTracking()
    
    // Start periodic reporting
    this.startPeriodicReporting()
  }

  // Core Web Vitals monitoring
  initCoreWebVitals() {
    // First Contentful Paint
    this.observePerformance('paint', (entries) => {
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
      if (fcpEntry) {
        this.metrics.vitals.FCP = Math.round(fcpEntry.startTime)
        this.reportMetric('FCP', this.metrics.vitals.FCP)
      }
    })

    // Largest Contentful Paint
    this.observePerformance('largest-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1]
      this.metrics.vitals.LCP = Math.round(lastEntry.startTime)
      this.reportMetric('LCP', this.metrics.vitals.LCP)
    })

    // First Input Delay
    this.observePerformance('first-input', (entries) => {
      const firstInput = entries[0]
      this.metrics.vitals.FID = Math.round(firstInput.processingStart - firstInput.startTime)
      this.reportMetric('FID', this.metrics.vitals.FID)
    })

    // Cumulative Layout Shift
    let clsValue = 0
    this.observePerformance('layout-shift', (entries) => {
      for (const entry of entries) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      }
      this.metrics.vitals.CLS = Math.round(clsValue * 1000) / 1000
    })

    // Time to First Byte
    this.initTTFB()
  }

  initTTFB() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navEntry = performance.getEntriesByType('navigation')[0]
      if (navEntry) {
        this.metrics.vitals.TTFB = Math.round(navEntry.responseStart - navEntry.requestStart)
        this.reportMetric('TTFB', this.metrics.vitals.TTFB)
      }
    }
  }

  // Navigation timing
  initNavigationTiming() {
    window.addEventListener('load', () => {
      const navEntry = performance.getEntriesByType('navigation')[0]
      if (navEntry) {
        this.metrics.navigation = {
          loadTime: Math.round(navEntry.loadEventEnd - navEntry.loadEventStart),
          domReadyTime: Math.round(navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart),
          renderTime: Math.round(navEntry.domContentLoadedEventStart - navEntry.responseStart)
        }
        
        this.reportMetrics('navigation', this.metrics.navigation)
      }
    })
  }

  // Resource timing analysis
  initResourceTiming() {
    this.observePerformance('resource', (entries) => {
      this.analyzeResources(entries)
    })
  }

  analyzeResources(entries) {
    let totalSize = 0
    let imageSize = 0
    let scriptSize = 0
    let styleSize = 0

    entries.forEach(entry => {
      const size = entry.transferSize || entry.encodedBodySize || 0
      totalSize += size

      if (entry.initiatorType === 'img') {
        imageSize += size
      } else if (entry.initiatorType === 'script') {
        scriptSize += size
      } else if (entry.initiatorType === 'css') {
        styleSize += size
      }
    })

    this.metrics.resources = {
      totalSize: Math.round(totalSize / 1024), // KB
      imageSize: Math.round(imageSize / 1024),
      scriptSize: Math.round(scriptSize / 1024),
      styleSize: Math.round(styleSize / 1024),
      count: entries.length
    }
  }

  // Memory monitoring
  initMemoryMonitoring() {
    if ('memory' in performance) {
      const updateMemory = () => {
        const memory = performance.memory
        this.metrics.memory = {
          usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1024 / 1024), // MB
          totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1024 / 1024),
          jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
        }
      }

      updateMemory()
      setInterval(updateMemory, 10000) // Update every 10 seconds
    }
  }

  // Service Worker metrics
  initServiceWorkerMetrics() {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      // Request cache stats from service worker
      const messageChannel = new MessageChannel()
      messageChannel.port1.onmessage = (event) => {
        if (event.data.type === 'CACHE_STATS') {
          this.metrics.serviceWorker = event.data.data
        }
      }

      navigator.serviceWorker.controller.postMessage(
        { type: 'GET_CACHE_STATS' },
        [messageChannel.port2]
      )

      // Update every 30 seconds
      setInterval(() => {
        if (navigator.serviceWorker.controller) {
          const messageChannel = new MessageChannel()
          messageChannel.port1.onmessage = (event) => {
            if (event.data.type === 'CACHE_STATS') {
              this.metrics.serviceWorker = event.data.data
            }
          }
          
          navigator.serviceWorker.controller.postMessage(
            { type: 'GET_CACHE_STATS' },
            [messageChannel.port2]
          )
        }
      }, 30000)
    }
  }

  // User experience tracking
  initUserExperienceTracking() {
    // Track page views
    let pageViews = 1
    window.addEventListener('popstate', () => {
      pageViews++
      this.metrics.userExperience.pageViews = pageViews
    })

    // Track session time
    const updateSessionTime = () => {
      this.metrics.userExperience.sessionTime = Math.round((Date.now() - this.sessionStart) / 1000)
    }

    setInterval(updateSessionTime, 5000) // Update every 5 seconds

    // Track game loads
    document.addEventListener('game-load', () => {
      this.metrics.userExperience.gameLoads++
    })

    // Track bounce rate (simplified)
    let hasInteracted = false
    const interactionEvents = ['click', 'scroll', 'keydown', 'touchstart']
    
    const markInteraction = () => {
      if (!hasInteracted) {
        hasInteracted = true
        interactionEvents.forEach(event => {
          document.removeEventListener(event, markInteraction)
        })
      }
    }

    interactionEvents.forEach(event => {
      document.addEventListener(event, markInteraction, { passive: true })
    })

    window.addEventListener('beforeunload', () => {
      this.metrics.userExperience.bounceRate = hasInteracted ? 0 : 1
    })
  }

  // Performance observer utility
  observePerformance(entryType, callback) {
    if (!('PerformanceObserver' in window)) return

    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries())
      })
      
      observer.observe({ entryTypes: [entryType] })
      this.observers.set(entryType, observer)
    } catch (error) {
      console.warn(`Failed to observe ${entryType}:`, error)
    }
  }

  // Generate performance score
  calculatePerformanceScore() {
    const scores = {
      FCP: this.scoreMetric(this.metrics.vitals.FCP, [1800, 3000]),
      LCP: this.scoreMetric(this.metrics.vitals.LCP, [2500, 4000]),
      FID: this.scoreMetric(this.metrics.vitals.FID, [100, 300]),
      CLS: this.scoreMetric(this.metrics.vitals.CLS, [0.1, 0.25], true),
      loadTime: this.scoreMetric(this.metrics.navigation.loadTime, [2000, 4000])
    }

    const validScores = Object.values(scores).filter(score => score !== null)
    const averageScore = validScores.length > 0 
      ? validScores.reduce((sum, score) => sum + score, 0) / validScores.length 
      : 0

    return {
      overall: Math.round(averageScore),
      details: scores
    }
  }

  scoreMetric(value, thresholds, reverse = false) {
    if (value === null) return null
    
    const [good, poor] = thresholds
    let score

    if (reverse) {
      // Lower is better (like CLS)
      if (value <= good) score = 100
      else if (value <= poor) score = 50 + (poor - value) / (poor - good) * 50
      else score = 0
    } else {
      // Lower is better (like FCP, LCP)
      if (value <= good) score = 100
      else if (value <= poor) score = 50 + (good - value) / (good - poor) * 50
      else score = 0
    }

    return Math.max(0, Math.min(100, Math.round(score)))
  }

  // Reporting methods
  reportMetric(name, value) {
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: value,
        timestamp: Date.now()
      })
    }

    console.log(`📊 ${name}: ${value}`)
  }

  reportMetrics(category, metrics) {
    Object.entries(metrics).forEach(([key, value]) => {
      this.reportMetric(`${category}_${key}`, value)
    })
  }

  // Periodic reporting
  startPeriodicReporting() {
    // Report every 30 seconds
    setInterval(() => {
      this.generatePerformanceReport()
    }, 30000)

    // Report before page unload
    window.addEventListener('beforeunload', () => {
      this.generatePerformanceReport(true)
    })
  }

  generatePerformanceReport(isFinal = false) {
    const report = {
      timestamp: Date.now(),
      session: this.sessionStart,
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      connection: this.getConnectionInfo(),
      metrics: this.metrics,
      score: this.calculatePerformanceScore(),
      isFinal
    }

    // Send to analytics
    if (window.gtag) {
      window.gtag('event', 'performance_report', {
        ...report,
        custom_parameter: JSON.stringify(report)
      })
    }

    return report
  }

  getConnectionInfo() {
    if ('connection' in navigator) {
      const conn = navigator.connection
      return {
        effectiveType: conn.effectiveType,
        downlink: conn.downlink,
        rtt: conn.rtt,
        saveData: conn.saveData
      }
    }
    return null
  }

  // Public API for dashboard
  getMetrics() {
    return {
      ...this.metrics,
      score: this.calculatePerformanceScore(),
      uptime: Math.round((Date.now() - this.sessionStart) / 1000)
    }
  }

  // Clear all observers
  destroy() {
    this.observers.forEach(observer => {
      observer.disconnect()
    })
    this.observers.clear()
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor()

// Auto-cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    performanceMonitor.destroy()
  })
}