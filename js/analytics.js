// Google Analytics - Universal Analytics Script
// This file provides unified Google Analytics integration for all pages

(function() {
    // Google tag (gtag.js) setup
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TGVJVCTQBE';
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-TGVJVCTQBE');

    // Make gtag globally available
    window.gtag = gtag;

    // Track page views automatically
    gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
    });

    // Enhanced game tracking functions
    window.trackGameStart = function(gameName) {
        gtag('event', 'game_start', {
            'game_name': gameName,
            'timestamp': new Date().toISOString()
        });
    };

    window.trackGameSession = function(gameName, duration) {
        gtag('event', 'game_session', {
            'game_name': gameName,
            'session_duration': duration
        });
    };

    window.trackGameFullscreen = function(gameName) {
        gtag('event', 'game_fullscreen', {
            'game_name': gameName
        });
    };

    // Track engagement time on page unload
    let pageStartTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - pageStartTime) / 1000);
        if (timeSpent > 5) { // Only track if user spent more than 5 seconds
            gtag('event', 'engagement_time', {
                'page_title': document.title,
                'time_spent': timeSpent
            });
        }
    });

    console.log('FunnyJourney Analytics initialized successfully');
})(); 