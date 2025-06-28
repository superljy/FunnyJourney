// Common Head Template for Game Pages
// This provides a unified way to generate head sections for all game pages

window.generateGameHead = function(config) {
    const {
        title,
        description,
        keywords,
        gameName,
        additionalMeta = []
    } = config;

    return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | FunnyJourney</title>
    <meta name="description" content="${description}">
    <meta name="keywords" content="${keywords}">
    
    <!-- SEO Meta Tags -->
    <meta property="og:title" content="${title} | FunnyJourney">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${window.location.href}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title} | FunnyJourney">
    <meta name="twitter:description" content="${description}">
    
    <!-- Analytics -->
    <script src="../js/analytics.js"></script>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'game-dark': '#0f0f23',
                        'game-purple': '#6366f1',
                        'game-blue': '#3b82f6',
                    }
                }
            }
        }
    </script>
    
    <!-- Common Game Styles -->
    <style>
        body {
            background: linear-gradient(135deg, #0f0f23 0%, #1e1b4b 50%, #312e81 100%);
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }
        
        .game-container {
            min-height: 100vh;
            background: rgba(15, 15, 35, 0.95);
        }
        
        .game-frame {
            border: 2px solid rgba(99, 102, 241, 0.3);
            border-radius: 12px;
            box-shadow: 0 0 30px rgba(99, 102, 241, 0.2);
        }
        
        .fullscreen-btn {
            background: linear-gradient(45deg, #6366f1, #8b5cf6);
            transition: all 0.3s ease;
        }
        
        .fullscreen-btn:hover {
            background: linear-gradient(45deg, #5855eb, #7c3aed);
            transform: translateY(-1px);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
        }
        
        .back-btn {
            background: rgba(55, 65, 81, 0.8);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(75, 85, 99, 0.3);
            transition: all 0.3s ease;
        }
        
        .back-btn:hover {
            background: rgba(75, 85, 99, 0.9);
            border-color: rgba(99, 102, 241, 0.5);
        }
        
        .feature-card {
            background: rgba(30, 27, 75, 0.6);
            border: 1px solid rgba(99, 102, 241, 0.2);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        .feature-card:hover {
            border-color: rgba(99, 102, 241, 0.4);
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(99, 102, 241, 0.1);
        }
    </style>
    ${additionalMeta.join('\n    ')}`;
};

// Common game page functions
window.initGamePage = function(gameName, gameUrl) {
    // Track game start
    if (window.trackGameStart) {
        window.trackGameStart(gameName);
    }

    // Setup fullscreen function
    window.toggleFullscreen = function() {
        const iframe = document.getElementById('gameFrame');
        if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
        } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
        } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
        }
        
        // Track fullscreen usage
        if (window.trackGameFullscreen) {
            window.trackGameFullscreen(gameName);
        }
    };
    
    // Setup navigation
    window.goHome = function() {
        window.location.href = '../index.html';
    };

    // Track game session time
    let gameStartTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - gameStartTime) / 1000);
        if (window.trackGameSession) {
            window.trackGameSession(gameName, timeSpent);
        }
    });
}; 