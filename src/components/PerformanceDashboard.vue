<template>
  <div class="performance-dashboard" v-if="showDashboard">
    <div class="dashboard-header">
      <h3>📊 Performance Monitor</h3>
      <button @click="toggleDashboard" class="close-btn">×</button>
    </div>
    
    <div class="dashboard-content">
      <!-- Overall Score -->
      <div class="score-section">
        <div class="score-circle" :class="getScoreClass(metrics.score?.overall || 0)">
          <span class="score-value">{{ metrics.score?.overall || 0 }}</span>
          <span class="score-label">Performance Score</span>
        </div>
        <div class="score-details">
          <div class="metric-item" v-for="(score, metric) in metrics.score?.details" :key="metric">
            <span class="metric-name">{{ metric.toUpperCase() }}</span>
            <span class="metric-value" :class="getScoreClass(score || 0)">{{ score || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- Core Web Vitals -->
      <div class="vitals-section">
        <h4>🎯 Core Web Vitals</h4>
        <div class="vitals-grid">
          <div class="vital-card">
            <div class="vital-value" :class="getVitalClass('FCP', metrics.vitals?.FCP)">
              {{ formatValue(metrics.vitals?.FCP, 'ms') }}
            </div>
            <div class="vital-label">First Contentful Paint</div>
          </div>
          
          <div class="vital-card">
            <div class="vital-value" :class="getVitalClass('LCP', metrics.vitals?.LCP)">
              {{ formatValue(metrics.vitals?.LCP, 'ms') }}
            </div>
            <div class="vital-label">Largest Contentful Paint</div>
          </div>
          
          <div class="vital-card">
            <div class="vital-value" :class="getVitalClass('FID', metrics.vitals?.FID)">
              {{ formatValue(metrics.vitals?.FID, 'ms') }}
            </div>
            <div class="vital-label">First Input Delay</div>
          </div>
          
          <div class="vital-card">
            <div class="vital-value" :class="getVitalClass('CLS', metrics.vitals?.CLS)">
              {{ formatValue(metrics.vitals?.CLS, '') }}
            </div>
            <div class="vital-label">Cumulative Layout Shift</div>
          </div>
        </div>
      </div>

      <!-- Resources -->
      <div class="resources-section">
        <h4>📦 Resource Usage</h4>
        <div class="resource-bars">
          <div class="resource-bar">
            <span class="resource-label">Images ({{ metrics.resources?.imageSize || 0 }}KB)</span>
            <div class="bar">
              <div class="bar-fill" :style="{ width: getResourcePercentage('image') + '%' }"></div>
            </div>
          </div>
          
          <div class="resource-bar">
            <span class="resource-label">Scripts ({{ metrics.resources?.scriptSize || 0 }}KB)</span>
            <div class="bar">
              <div class="bar-fill" :style="{ width: getResourcePercentage('script') + '%' }"></div>
            </div>
          </div>
          
          <div class="resource-bar">
            <span class="resource-label">Styles ({{ metrics.resources?.styleSize || 0 }}KB)</span>
            <div class="bar">
              <div class="bar-fill" :style="{ width: getResourcePercentage('style') + '%' }"></div>
            </div>
          </div>
        </div>
        
        <div class="resource-summary">
          Total: {{ metrics.resources?.totalSize || 0 }}KB | 
          Count: {{ metrics.resources?.count || 0 }} resources
        </div>
      </div>

      <!-- Memory Usage -->
      <div class="memory-section" v-if="metrics.memory?.usedJSHeapSize">
        <h4>🧠 Memory Usage</h4>
        <div class="memory-info">
          <div class="memory-stat">
            <span class="memory-label">Used:</span>
            <span class="memory-value">{{ metrics.memory.usedJSHeapSize }}MB</span>
          </div>
          <div class="memory-stat">
            <span class="memory-label">Total:</span>
            <span class="memory-value">{{ metrics.memory.totalJSHeapSize }}MB</span>
          </div>
          <div class="memory-stat">
            <span class="memory-label">Limit:</span>
            <span class="memory-value">{{ metrics.memory.jsHeapSizeLimit }}MB</span>
          </div>
        </div>
        
        <div class="memory-bar">
          <div class="memory-fill" :style="{ width: getMemoryPercentage() + '%' }"></div>
        </div>
      </div>

      <!-- Service Worker Stats -->
      <div class="sw-section" v-if="hasServiceWorker">
        <h4>⚙️ Service Worker</h4>
        <div class="sw-stats">
          <div class="sw-stat">
            <span class="sw-value">{{ metrics.serviceWorker?.cacheHits || 0 }}</span>
            <span class="sw-label">Cache Hits</span>
          </div>
          <div class="sw-stat">
            <span class="sw-value">{{ metrics.serviceWorker?.cacheMisses || 0 }}</span>
            <span class="sw-label">Cache Misses</span>
          </div>
          <div class="sw-stat">
            <span class="sw-value">{{ getCacheHitRate() }}%</span>
            <span class="sw-label">Hit Rate</span>
          </div>
        </div>
      </div>

      <!-- Session Info -->
      <div class="session-section">
        <h4>📈 Session Stats</h4>
        <div class="session-stats">
          <div class="session-stat">
            <span class="session-label">Uptime:</span>
            <span class="session-value">{{ formatUptime(metrics.uptime || 0) }}</span>
          </div>
          <div class="session-stat">
            <span class="session-label">Page Views:</span>
            <span class="session-value">{{ metrics.userExperience?.pageViews || 1 }}</span>
          </div>
          <div class="session-stat">
            <span class="session-label">Game Loads:</span>
            <span class="session-value">{{ metrics.userExperience?.gameLoads || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="dashboard-footer">
      <button @click="downloadReport" class="action-btn">💾 Export Report</button>
      <button @click="clearCache" class="action-btn">🗑️ Clear Cache</button>
    </div>
  </div>
  
  <!-- Toggle Button -->
  <button v-if="!showDashboard" @click="toggleDashboard" class="dashboard-toggle">
    📊
  </button>
</template>

<script>
import { performanceMonitor } from '../utils/performanceMonitor.js'

export default {
  name: 'PerformanceDashboard',
  data() {
    return {
      showDashboard: false,
      metrics: {},
      updateInterval: null
    }
  },
  computed: {
    hasServiceWorker() {
      return 'serviceWorker' in navigator && navigator.serviceWorker.controller
    }
  },
  mounted() {
    this.startUpdating()
    
    // Show dashboard in development or when hash parameter is present
    if (process.env.NODE_ENV === 'development' || window.location.hash.includes('debug')) {
      this.showDashboard = true
    }
  },
  beforeUnmount() {
    this.stopUpdating()
  },
  methods: {
    startUpdating() {
      this.updateMetrics()
      this.updateInterval = setInterval(() => {
        this.updateMetrics()
      }, 2000) // Update every 2 seconds
    },
    
    stopUpdating() {
      if (this.updateInterval) {
        clearInterval(this.updateInterval)
      }
    },
    
    updateMetrics() {
      this.metrics = performanceMonitor.getMetrics()
    },
    
    toggleDashboard() {
      this.showDashboard = !this.showDashboard
    },
    
    getScoreClass(score) {
      if (score >= 90) return 'excellent'
      if (score >= 75) return 'good'
      if (score >= 50) return 'needs-improvement'
      return 'poor'
    },
    
    getVitalClass(metric, value) {
      if (value === null) return 'unknown'
      
      const thresholds = {
        FCP: [1800, 3000],
        LCP: [2500, 4000],
        FID: [100, 300],
        CLS: [0.1, 0.25]
      }
      
      const [good, poor] = thresholds[metric] || [0, 0]
      
      if (metric === 'CLS') {
        if (value <= good) return 'excellent'
        if (value <= poor) return 'needs-improvement'
        return 'poor'
      } else {
        if (value <= good) return 'excellent'
        if (value <= poor) return 'needs-improvement'
        return 'poor'
      }
    },
    
    getResourcePercentage(type) {
      const total = this.metrics.resources?.totalSize || 1
      const size = this.metrics.resources?.[`${type}Size`] || 0
      return Math.min(100, (size / total) * 100)
    },
    
    getMemoryPercentage() {
      const used = this.metrics.memory?.usedJSHeapSize || 0
      const total = this.metrics.memory?.totalJSHeapSize || 1
      return Math.min(100, (used / total) * 100)
    },
    
    getCacheHitRate() {
      const hits = this.metrics.serviceWorker?.cacheHits || 0
      const misses = this.metrics.serviceWorker?.cacheMisses || 0
      const total = hits + misses
      return total > 0 ? Math.round((hits / total) * 100) : 0
    },
    
    formatValue(value, unit) {
      if (value === null || value === undefined) return '-'
      return `${value}${unit}`
    },
    
    formatUptime(seconds) {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const secs = seconds % 60
      
      if (hours > 0) {
        return `${hours}h ${minutes}m`
      } else if (minutes > 0) {
        return `${minutes}m ${secs}s`
      } else {
        return `${secs}s`
      }
    },
    
    downloadReport() {
      const report = performanceMonitor.generatePerformanceReport()
      const blob = new Blob([JSON.stringify(report, null, 2)], { 
        type: 'application/json' 
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `performance-report-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
    },
    
    async clearCache() {
      if (this.hasServiceWorker) {
        const messageChannel = new MessageChannel()
        messageChannel.port1.onmessage = (event) => {
          if (event.data.type === 'CACHE_CLEARED') {
            alert('Cache cleared successfully!')
            this.updateMetrics()
          }
        }
        
        navigator.serviceWorker.controller.postMessage(
          { type: 'CLEAR_CACHE' },
          [messageChannel.port2]
        )
      }
    }
  }
}
</script>

<style scoped>
.performance-dashboard {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 400px;
  max-height: 80vh;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  z-index: 10000;
  overflow: hidden;
  font-size: 14px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: #6366f1;
  color: white;
}

.dashboard-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-content {
  padding: 20px;
  max-height: 60vh;
  overflow-y: auto;
}

.score-section {
  text-align: center;
  margin-bottom: 24px;
}

.score-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.score-circle.excellent { background: #10b981; color: white; }
.score-circle.good { background: #f59e0b; color: white; }
.score-circle.needs-improvement { background: #ef4444; color: white; }
.score-circle.poor { background: #6b7280; color: white; }

.score-value {
  font-size: 24px;
  line-height: 1;
}

.score-label {
  font-size: 10px;
  opacity: 0.9;
}

.score-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 8px;
  margin-top: 12px;
}

.metric-item {
  text-align: center;
  padding: 8px;
  background: #f8fafc;
  border-radius: 6px;
}

.metric-name {
  display: block;
  font-size: 10px;
  color: #6b7280;
  margin-bottom: 4px;
}

.metric-value {
  font-weight: 600;
  font-size: 16px;
}

.metric-value.excellent { color: #10b981; }
.metric-value.good { color: #f59e0b; }
.metric-value.needs-improvement { color: #ef4444; }
.metric-value.poor { color: #6b7280; }

.vitals-section,
.resources-section,
.memory-section,
.sw-section,
.session-section {
  margin-bottom: 20px;
}

.vitals-section h4,
.resources-section h4,
.memory-section h4,
.sw-section h4,
.session-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: #374151;
}

.vitals-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.vital-card {
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  text-align: center;
}

.vital-value {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.vital-value.excellent { color: #10b981; }
.vital-value.needs-improvement { color: #f59e0b; }
.vital-value.poor { color: #ef4444; }
.vital-value.unknown { color: #6b7280; }

.vital-label {
  font-size: 11px;
  color: #6b7280;
}

.resource-bars {
  margin-bottom: 8px;
}

.resource-bar {
  margin-bottom: 8px;
}

.resource-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
  display: block;
}

.bar {
  height: 6px;
  background: #e5e7eb;
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: #6366f1;
  transition: width 0.3s ease;
}

.resource-summary {
  font-size: 12px;
  color: #6b7280;
  text-align: center;
}

.memory-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.memory-stat {
  text-align: center;
  padding: 8px;
  background: #f8fafc;
  border-radius: 6px;
}

.memory-label {
  display: block;
  font-size: 10px;
  color: #6b7280;
  margin-bottom: 4px;
}

.memory-value {
  font-weight: 600;
  font-size: 12px;
}

.memory-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.memory-fill {
  height: 100%;
  background: #8b5cf6;
  transition: width 0.3s ease;
}

.sw-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.sw-stat {
  text-align: center;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
}

.sw-value {
  display: block;
  font-size: 18px;
  font-weight: 600;
  color: #6366f1;
  margin-bottom: 4px;
}

.sw-label {
  font-size: 11px;
  color: #6b7280;
}

.session-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
}

.session-stat {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: #f8fafc;
  border-radius: 6px;
}

.session-label {
  font-size: 12px;
  color: #6b7280;
}

.session-value {
  font-weight: 600;
  font-size: 12px;
}

.dashboard-footer {
  padding: 16px 20px;
  background: #f8fafc;
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  padding: 8px 12px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s ease;
}

.action-btn:hover {
  background: #5a67d8;
}

.dashboard-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  z-index: 9999;
  transition: all 0.3s ease;
}

.dashboard-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.6);
}

/* Scrollbar styling */
.dashboard-content::-webkit-scrollbar {
  width: 6px;
}

.dashboard-content::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.dashboard-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.dashboard-content::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>