<template>
  <div class="ad-container" :class="adClass" v-if="shouldShowAd">
    <div class="ad-label">Advertisement</div>
    <div :id="adId" class="ad-content">
      <ins 
        class="adsbygoogle"
        style="display:block"
        :data-ad-client="adClient"
        :data-ad-slot="slotId"
        :data-ad-format="adFormat"
        :data-full-width-responsive="fullWidthResponsive"
      ></ins>
    </div>
  </div>
</template>

<script>
import { analytics } from '../utils/analytics.js'

export default {
  name: 'AdContainer',
  props: {
    slotId: {
      type: String,
      required: true
    },
    adFormat: {
      type: String,
      default: 'auto'
    },
    fullWidthResponsive: {
      type: String,
      default: 'true'
    },
    adType: {
      type: String,
      default: 'banner',
      validator: value => ['banner', 'sidebar', 'inline', 'footer'].includes(value)
    }
  },
  data() {
    return {
      adClient: 'ca-pub-9114241331557514',
      shouldShowAd: true
    }
  },
  computed: {
    adId() {
      return `ad-${this.slotId}-${Math.random().toString(36).substr(2, 9)}`
    },
    adClass() {
      return `ad-${this.adType}`
    }
  },
  mounted() {
    this.initializeAd()
  },
  methods: {
    initializeAd() {
      // Check if AdSense is available
      if (typeof window !== 'undefined') {
        this.$nextTick(() => {
          try {
            // Initialize AdSense ad
            if (window.adsbygoogle) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
            } else {
              // Load AdSense if not already loaded
              this.loadAdSense()
            }
          } catch (error) {
            console.warn('AdSense initialization failed:', error)
          }
        })
      }
    },
    
    loadAdSense() {
      const script = document.createElement('script')
      script.async = true
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.adClient}`
      script.crossOrigin = 'anonymous'
      
      script.onload = () => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.warn('AdSense push failed:', error)
        }
      }
      
      document.head.appendChild(script)
    }
  }
}
</script>

<style scoped>
.ad-container {
  margin: 2rem 0;
  text-align: center;
  position: relative;
  min-height: 90px; /* Prevent layout shift */
}

.ad-label {
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
  opacity: 0.7;
}

.ad-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

/* Ad Type Specific Styles */
.ad-banner {
  max-width: 728px;
  margin: 2rem auto;
}

.ad-banner .ad-content {
  min-height: 90px;
}

.ad-sidebar {
  max-width: 300px;
  position: sticky;
  top: 100px;
}

.ad-sidebar .ad-content {
  min-height: 250px;
}

.ad-inline {
  max-width: 320px;
  margin: 1rem auto;
}

.ad-inline .ad-content {
  min-height: 100px;
}

.ad-footer {
  max-width: 728px;
  margin: 2rem auto 1rem;
}

.ad-footer .ad-content {
  min-height: 90px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .ad-banner,
  .ad-footer {
    max-width: 320px;
  }
  
  .ad-banner .ad-content,
  .ad-footer .ad-content {
    min-height: 50px;
  }
  
  .ad-sidebar {
    position: static;
    max-width: 320px;
    margin: 1rem auto;
  }
}

@media (max-width: 480px) {
  .ad-container {
    margin: 1rem 0;
  }
  
  .ad-content {
    min-height: 50px;
  }
}

/* Loading placeholder */
.ad-content:empty::before {
  content: 'Loading advertisement...';
  color: #9ca3af;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: inherit;
}

/* Hide ads for users with ad blockers gracefully */
.ad-container:has(.adsbygoogle[data-adsbygoogle-status="unfilled"]) {
  display: none;
}

/* Print styles - hide ads when printing */
@media print {
  .ad-container {
    display: none;
  }
}
</style>