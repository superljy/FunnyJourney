// Analytics and Ads Integration for FunnyJourney Games
// Includes Google Analytics 4 and Google AdSense

class AnalyticsManager {
  constructor() {
    this.initialized = false;
    this.gameStartTime = null;
  }

  // Initialize Google Analytics 4 and Google Ads
  init() {
    if (this.initialized) return;

    // Google Analytics 4
    this.initGoogleAnalytics();
    
    // Google AdSense
    this.initGoogleAds();
    
    this.initialized = true;
    console.log('FunnyJourney Analytics & Ads initialized');
  }

  // Initialize Google Analytics 4
  initGoogleAnalytics() {
    // Load gtag script
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-TGVJVCTQBE';
    document.head.appendChild(gtagScript);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-TGVJVCTQBE', {
      page_title: document.title,
      page_location: window.location.href
    });

    // Make gtag globally available
    window.gtag = gtag;
  }

  // Initialize Google AdSense
  initGoogleAds() {
    const adsScript = document.createElement('script');
    adsScript.async = true;
    adsScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9114241331557514';
    adsScript.crossOrigin = 'anonymous';
    document.head.appendChild(adsScript);
  }

  // Track page views
  trackPageView(pageName = '') {
    if (!window.gtag) return;
    
    window.gtag('event', 'page_view', {
      page_title: document.title + (pageName ? ` - ${pageName}` : ''),
      page_location: window.location.href,
      page_name: pageName
    });
  }

  // Track game interactions
  trackGameView(gameName) {
    if (!window.gtag) return;
    
    window.gtag('event', 'game_view', {
      game_name: gameName,
      event_category: 'Games',
      event_label: `${gameName}_view`
    });
  }

  trackGameClick(gameName) {
    if (!window.gtag) return;
    
    window.gtag('event', 'game_click', {
      game_name: gameName,
      event_category: 'Games',
      event_label: `${gameName}_click`
    });
  }

  trackGameStart(gameName) {
    this.gameStartTime = Date.now();
    
    if (!window.gtag) return;
    
    window.gtag('event', 'game_start', {
      game_name: gameName,
      timestamp: new Date().toISOString(),
      event_category: 'Games',
      event_label: gameName
    });
  }

  trackGameLoaded(gameName, loadTime = null) {
    if (!window.gtag) return;
    
    const eventData = {
      game_name: gameName,
      event_category: 'Games',
      event_label: `${gameName}_loaded`
    };
    
    if (loadTime) {
      eventData.load_time = loadTime;
      eventData.value = loadTime;
    }
    
    window.gtag('event', 'game_loaded', eventData);
  }

  trackGameError(gameName, errorType = 'unknown', errorMessage = '') {
    if (!window.gtag) return;
    
    window.gtag('event', 'game_error', {
      game_name: gameName,
      error_type: errorType,
      error_message: errorMessage,
      event_category: 'Games',
      event_label: `${gameName}_error`
    });
  }

  trackGameSession(gameName, duration) {
    if (!window.gtag) return;
    
    window.gtag('event', 'game_session', {
      game_name: gameName,
      session_duration: duration,
      event_category: 'Games',
      event_label: `${gameName}_session`,
      value: duration
    });
  }

  trackGameFullscreen(gameName) {
    if (!window.gtag) return;
    
    window.gtag('event', 'game_fullscreen', {
      game_name: gameName,
      event_category: 'Games',
      event_label: `${gameName}_fullscreen`
    });
  }

  trackGameShare(gameName, shareMethod = 'unknown') {
    if (!window.gtag) return;
    
    window.gtag('event', 'share', {
      method: shareMethod,
      content_type: 'game',
      item_id: gameName,
      game_name: gameName,
      event_category: 'Games',
      event_label: `${gameName}_share_${shareMethod}`
    });
  }

  trackGameRelated(gameName, relatedGameName) {
    if (!window.gtag) return;
    
    window.gtag('event', 'select_content', {
      content_type: 'related_game',
      content_id: relatedGameName,
      source_game: gameName,
      game_name: relatedGameName,
      event_category: 'Games',
      event_label: `${gameName}_related_${relatedGameName}`
    });
  }

  // Track SEO-relevant events
  trackSearchQuery(query) {
    if (!window.gtag) return;
    
    window.gtag('event', 'search', {
      search_term: query,
      event_category: 'SEO',
      event_label: 'site_search'
    });
  }

  trackGameCategory(category) {
    if (!window.gtag) return;
    
    window.gtag('event', 'select_content', {
      content_type: 'game_category',
      content_id: category,
      event_category: 'Navigation',
      event_label: `category_${category}`
    });
  }

  // Track engagement metrics for SEO
  trackEngagement() {
    let pageStartTime = Date.now();
    
    const trackEngagementTime = () => {
      const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
      if (timeSpent > 5 && window.gtag) {
        window.gtag('event', 'engagement_time', {
          page_title: document.title,
          time_spent: timeSpent,
          event_category: 'Engagement',
          value: timeSpent
        });
      }
    };

    // Track on page unload
    window.addEventListener('beforeunload', trackEngagementTime);
    
    // Track on visibility change (tab switching)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        trackEngagementTime();
        pageStartTime = Date.now(); // Reset timer
      }
    });
  }

  // Ad display helper functions
  displayAd(adSlot, adSize = 'auto') {
    if (!window.adsbygoogle) {
      console.warn('AdSense not loaded yet');
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Error displaying ad:', e);
    }
  }

  // Create responsive ad unit
  createAdUnit(container, adSlot, adFormat = 'auto', fullWidthResponsive = true) {
    const adContainer = document.querySelector(container);
    if (!adContainer) return;

    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', 'ca-pub-9114241331557514');
    ins.setAttribute('data-ad-slot', adSlot);
    ins.setAttribute('data-ad-format', adFormat);
    
    if (fullWidthResponsive) {
      ins.setAttribute('data-full-width-responsive', 'true');
    }

    adContainer.appendChild(ins);
    this.displayAd();
  }
}

// Export singleton instance
export const analytics = new AnalyticsManager();

// Auto-initialize when imported
if (typeof window !== 'undefined') {
  analytics.init();
  analytics.trackEngagement();
}