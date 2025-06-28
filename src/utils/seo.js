// SEO Optimization Utilities for FunnyJourney Games
// Based on SEO report keywords: Free Online Games, No Download Games, Browser Games, etc.

export class SEOManager {
  constructor() {
    this.baseTitle = 'FunnyJourney';
    this.baseDescription = 'Play 500+ free online games instantly! No downloads, no registration required. Enjoy browser games, puzzles, arcade classics & more.';
    this.keywords = [
      'free online games',
      'no download games', 
      'browser games',
      'h5 games',
      'instant play games',
      'free online casual games',
      'play free games online no download',
      'multiplayer browser games',
      'online puzzle games no download'
    ];
  }

  // Set page meta tags for SEO optimization
  setPageMeta(config = {}) {
    const {
      title = 'Free Online Games 2025 - Play 500+ Browser Games Instantly',
      description = this.baseDescription,
      keywords = this.keywords,
      url = window.location.href,
      image = '',
      type = 'website',
      gameName = '',
      gameCategory = ''
    } = config;

    // Update title
    document.title = `${title} | ${this.baseTitle}`;
    
    // Update meta description
    this.updateMeta('description', description);
    this.updateMeta('keywords', keywords.join(', '));

    // Open Graph tags
    this.updateMeta('og:title', `${title} | ${this.baseTitle}`, 'property');
    this.updateMeta('og:description', description, 'property');
    this.updateMeta('og:url', url, 'property');
    this.updateMeta('og:type', type, 'property');
    if (image) this.updateMeta('og:image', image, 'property');

    // Twitter Card tags
    this.updateMeta('twitter:card', 'summary_large_image');
    this.updateMeta('twitter:title', `${title} | ${this.baseTitle}`);
    this.updateMeta('twitter:description', description);
    if (image) this.updateMeta('twitter:image', image);

    // Game-specific meta
    if (gameName) {
      this.updateMeta('game:name', gameName, 'property');
      this.updateMeta('game:category', gameCategory, 'property');
    }
  }

  // Update or create meta tag
  updateMeta(name, content, type = 'name') {
    let meta = document.querySelector(`meta[${type}="${name}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(type, name);
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  }

  // Generate JSON-LD structured data
  generateStructuredData(config = {}) {
    const {
      type = 'WebSite',
      name = 'FunnyJourney - Free Online Games',
      description = this.baseDescription,
      url = window.location.href,
      gameName = '',
      gameCategory = '',
      gameDescription = '',
      gameImage = ''
    } = config;

    let structuredData;

    if (type === 'Game' && gameName) {
      // Game-specific structured data
      structuredData = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": gameName,
        "description": gameDescription || `Play ${gameName} free online - ${description}`,
        "url": url,
        "applicationCategory": "Game",
        "operatingSystem": "Any",
        "genre": gameCategory || "Casual",
        "gameLocation": "Online",
        "playMode": "SinglePlayer",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "publisher": {
          "@type": "Organization",
          "name": "FunnyJourney",
          "url": "https://funnyjourneys.github.io/"
        }
      };

      if (gameImage) {
        structuredData.image = gameImage;
      }
    } else {
      // Website structured data
      structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": name,
        "alternateName": "Free Online Games 2025",
        "url": "https://funnyjourneys.github.io/",
        "description": description,
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://funnyjourneys.github.io/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "mainEntity": {
          "@type": "CollectionPage",
          "name": "Free Online Games Collection",
          "description": "Collection of 500+ free browser games",
          "url": url
        }
      };
    }

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);
  }

  // Generate SEO-optimized titles for games
  generateGameTitle(gameName, category = '') {
    const templates = [
      `${gameName} - Play Free Online Game | No Download Required`,
      `${gameName} Free Online - Instant Browser Game | FunnyJourney`,
      `Play ${gameName} Online Free - No Download Needed`,
      `${gameName} - Free Browser Game | Play Instantly Online`
    ];

    if (category) {
      templates.push(`${gameName} - Free Online ${category} Game | Play Now`);
    }

    // Randomly select template for variety while maintaining SEO
    return templates[Math.floor(Math.random() * templates.length)];
  }

  // Generate SEO-optimized descriptions for games
  generateGameDescription(gameName, gameDescription = '', category = '') {
    const baseText = gameDescription || `Enjoy ${gameName} online for free!`;
    const seoSuffix = 'No downloads required. Play instantly in your browser. Join millions of players worldwide!';
    
    let description = `${baseText} ${seoSuffix}`;
    
    if (category) {
      description = `Play ${gameName}, an exciting ${category.toLowerCase()} game, free online. ${baseText} ${seoSuffix}`;
    }

    // Ensure description is within optimal length (150-160 chars)
    if (description.length > 160) {
      description = description.substring(0, 157) + '...';
    }

    return description;
  }

  // Generate SEO-friendly URLs
  generateSEOUrl(gameName, category = '') {
    const slug = gameName
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Remove multiple hyphens
      .trim();

    return category ? `games/${category.toLowerCase()}/${slug}.html` : `games/${slug}.html`;
  }

  // Track SEO performance
  trackSEOMetrics() {
    const metrics = {
      pageLoadTime: 0,
      timeToInteractive: 0,
      firstContentfulPaint: 0
    };

    // Use Performance API if available
    if ('performance' in window) {
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        metrics.pageLoadTime = perfData.loadEventEnd - perfData.loadEventStart;
        
        // Track with analytics
        if (window.gtag) {
          window.gtag('event', 'page_load_time', {
            event_category: 'SEO',
            event_label: 'performance',
            value: Math.round(metrics.pageLoadTime)
          });
        }
      });
    }

    return metrics;
  }

  // Add canonical URL
  setCanonicalUrl(url = window.location.href) {
    let canonical = document.querySelector('link[rel="canonical"]');
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    
    canonical.href = url;
  }

  // Add hreflang for international SEO (if needed later)
  setHreflang(lang = 'en', url = window.location.href) {
    let hreflang = document.querySelector(`link[hreflang="${lang}"]`);
    
    if (!hreflang) {
      hreflang = document.createElement('link');
      hreflang.rel = 'alternate';
      hreflang.hreflang = lang;
      document.head.appendChild(hreflang);
    }
    
    hreflang.href = url;
  }
}

// Export singleton instance
export const seoManager = new SEOManager();