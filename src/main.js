import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'

// Import global utilities
import { analytics } from './utils/analyticsOptimized.js'
import { seoManager } from './utils/seo.js'

// Create Vue app
const app = createApp(App)
const head = createHead()

// Use router and head
app.use(router)
app.use(head)

// Global properties for utilities
app.config.globalProperties.$analytics = analytics
app.config.globalProperties.$seo = seoManager

// Error handling
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue error:', err, info)
  
  // Track errors with analytics
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: err.toString(),
      fatal: false
    })
  }
}

// Mount the app
app.mount('#app')

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0]
    const loadTime = perfData.loadEventEnd - perfData.loadEventStart
    
    console.log('Page load time:', loadTime + 'ms')
    
    // Track performance with analytics
    if (window.gtag && loadTime > 0) {
      window.gtag('event', 'timing_complete', {
        name: 'page_load',
        value: Math.round(loadTime)
      })
    }
  })
}