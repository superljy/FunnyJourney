/**
 * FunnyJourney.com - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('FunnyJourney website loaded!');
    
    // Add active class to current navigation item
    highlightCurrentPage();
    
    // Smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Enable back-to-top button functionality if it exists
    setupBackToTop();
});

/**
 * Highlights the current page in the navigation menu
 */
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        // Remove any existing active classes
        link.classList.remove('active');
        
        // Get the path from the href attribute
        const linkPath = new URL(link.href, window.location.origin).pathname;
        
        // Check if this link corresponds to the current page
        if (currentPath === linkPath || 
            (currentPath.includes(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
        } else if (currentPath === '/' && linkPath === '/') {
            link.classList.add('active');
        }
    });
}

/**
 * Sets up smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Sets up back-to-top button functionality if it exists
 */
function setupBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    if (!backToTopButton) return;
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Creates a lazy-loading effect for images
 * Note: Modern browsers have native lazy loading, but this is a fallback
 */
function lazyLoadImages() {
    // Check if native lazy loading is supported
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        image.classList.remove('lazy-image');
                        imageObserver.unobserve(image);
                    }
                });
            });
            
            lazyImages.forEach(image => {
                imageObserver.observe(image);
            });
        } else {
            // Fallback for older browsers without IntersectionObserver
            let lazyLoadThrottleTimeout;
            
            function lazyLoad() {
                if (lazyLoadThrottleTimeout) {
                    clearTimeout(lazyLoadThrottleTimeout);
                }
                
                lazyLoadThrottleTimeout = setTimeout(() => {
                    const scrollTop = window.pageYOffset;
                    
                    lazyImages.forEach(image => {
                        if (image.offsetTop < window.innerHeight + scrollTop) {
                            image.src = image.dataset.src;
                            image.classList.remove('lazy-image');
                        }
                    });
                    
                    if (lazyImages.length === 0) {
                        document.removeEventListener('scroll', lazyLoad);
                        window.removeEventListener('resize', lazyLoad);
                        window.removeEventListener('orientationChange', lazyLoad);
                    }
                }, 20);
            }
            
            document.addEventListener('scroll', lazyLoad);
            window.addEventListener('resize', lazyLoad);
            window.addEventListener('orientationChange', lazyLoad);
        }
    }
}

// FunnyJourney.com - Enhanced Interactive Features
// Modern gaming website with engaging user experience

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initStickyPlayButton();
    initTypewriterEffect();
    initCounterAnimation();
    initGameFilters();
    initScrollAnimations();
    initParticleEffects();
    initRandomGameFeature();
    initInstantDemoFeature();
    initHeaderAnimation();
    
    console.log('🎮 FunnyJourney loaded successfully!');
});

// Sticky Play Button Management
function initStickyPlayButton() {
    const stickyButton = document.getElementById('stickyPlay');
    const heroSection = document.querySelector('.hero-enhanced');
    
    if (!stickyButton || !heroSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stickyButton.classList.remove('visible');
            } else {
                stickyButton.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(heroSection);
}

// Smooth scroll to games section
function scrollToGames() {
    const gamesSection = document.getElementById('games');
    if (gamesSection) {
        gamesSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add a little bounce effect to the section
        setTimeout(() => {
            gamesSection.style.transform = 'scale(1.02)';
            setTimeout(() => {
                gamesSection.style.transform = 'scale(1)';
            }, 200);
        }, 500);
    }
}

// Typewriter effect for hero title
function initTypewriterEffect() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const words = [
        'Right Now!',
        'For Free!',
        'No Download!',
        'Instantly!',
        'Without Limits!'
    ];
    
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentWord = words[currentWordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing new word
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start the effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Animated counter for statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
            
            // Add a celebratory pulse effect
            element.style.transform = 'scale(1.2)';
            element.style.color = '#39ff14';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                element.style.color = '';
            }, 300);
        }
    };
    
    updateCounter();
}

// Game category filtering
function initGameFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.enhanced-card[data-category]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter games with animation
            gameCards.forEach((card, index) => {
                const category = card.dataset.category;
                
                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }, index * 50);
            });
            
            // Add filter effect feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-interactive, .enhanced-card, .review-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Initially hide elements
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Particle effects for feature icons
function initParticleEffects() {
    const featureCards = document.querySelectorAll('.feature-interactive');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            createParticles(card);
        });
    });
}

function createParticles(container) {
    const particleCount = 6;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#00d4ff';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = '0.8';
        
        const rect = container.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        
        container.appendChild(particle);
        
        // Animate particle
        const angle = (i / particleCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const duration = 800 + Math.random() * 400;
        
        particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 0.8
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// Random game feature
function initRandomGameFeature() {
    const games = [
        { name: 'Monster Survivors', url: 'games/monster-survivors.html' },
        { name: 'Classic Solitaire', url: 'games/solitaire.html' },
        { name: 'Pyramid Solitaire', url: 'games/pyramid-solitaire.html' },
        { name: 'Fast Food Rush', url: 'games/fast-food-rush.html' },
        { name: 'Egg Helix', url: 'games/egg-helix.html' },
        { name: 'Poop Clicker', url: 'games/poop-clicker.html' }
    ];
    
    window.playRandomGame = function() {
        const randomGame = games[Math.floor(Math.random() * games.length)];
        
        // Show loading effect
        const buttons = document.querySelectorAll('button[onclick="playRandomGame()"]');
        buttons.forEach(button => {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            button.disabled = true;
            
            setTimeout(() => {
                window.location.href = randomGame.url;
            }, 1000);
        });
    };
}

// Instant demo feature
function initInstantDemoFeature() {
    window.showInstantDemo = function() {
        const demoModal = createDemoModal();
        document.body.appendChild(demoModal);
        
        setTimeout(() => {
            demoModal.classList.add('visible');
        }, 10);
    };
}

function createDemoModal() {
    const modal = document.createElement('div');
    modal.className = 'demo-modal';
    modal.innerHTML = `
        <div class="demo-modal-content">
            <div class="demo-modal-header">
                <h3>⚡ Instant Play Demo</h3>
                <button class="demo-close" onclick="closeDemoModal(this)">&times;</button>
            </div>
            <div class="demo-modal-body">
                <div class="demo-steps">
                    <div class="demo-step">
                        <div class="step-number">1</div>
                        <p>Click any game</p>
                    </div>
                    <div class="demo-step">
                        <div class="step-number">2</div>
                        <p>Game loads instantly</p>
                    </div>
                    <div class="demo-step">
                        <div class="step-number">3</div>
                        <p>Start playing immediately!</p>
                    </div>
                </div>
                <div class="demo-timer">
                    <div class="timer-circle">
                        <span class="timer-text">2s</span>
                    </div>
                    <p>Average loading time</p>
                </div>
                <button class="btn btn-primary" onclick="scrollToGames(); closeDemoModal(this)">
                    <i class="fas fa-play"></i> Try It Now!
                </button>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .demo-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .demo-modal.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .demo-modal-content {
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        .demo-modal.visible .demo-modal-content {
            transform: scale(1);
        }
        
        .demo-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }
        
        .demo-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .demo-steps {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2rem;
        }
        
        .demo-step {
            text-align: center;
            flex: 1;
        }
        
        .step-number {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--primary-gradient);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 0.5rem;
            font-weight: 700;
        }
        
        .demo-timer {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .timer-circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: var(--accent-gradient);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            animation: timerPulse 2s infinite;
        }
        
        .timer-text {
            color: white;
            font-weight: 700;
            font-size: 1.5rem;
        }
        
        @keyframes timerPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
    
    return modal;
}

window.closeDemoModal = function(element) {
    const modal = element.closest('.demo-modal');
    modal.classList.remove('visible');
    setTimeout(() => {
        modal.remove();
    }, 300);
};

// Header animation on scroll
function initHeaderAnimation() {
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
                header.style.background = 'rgba(26, 26, 26, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            }
        } else {
            header.style.transform = 'translateY(0)';
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Enhanced game card interactions
document.addEventListener('DOMContentLoaded', function() {
    const gameCards = document.querySelectorAll('.enhanced-card');
    
    gameCards.forEach(card => {
        // Add hover sound effect (visual feedback)
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            
            // Add glow effect
            const existingGlow = card.querySelector('.card-glow');
            if (!existingGlow) {
                const glow = document.createElement('div');
                glow.className = 'card-glow';
                glow.style.cssText = `
                    position: absolute;
                    top: -5px;
                    left: -5px;
                    right: -5px;
                    bottom: -5px;
                    background: linear-gradient(45deg, #667eea, #764ba2, #4facfe, #00f2fe);
                    border-radius: calc(var(--radius-lg) + 5px);
                    z-index: -1;
                    opacity: 0.3;
                    filter: blur(10px);
                    animation: cardGlow 2s infinite;
                `;
                card.appendChild(glow);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.remove();
            }
        });
        
        // Add click ripple effect
        card.addEventListener('click', (e) => {
            if (e.target.closest('.instant-play-btn')) return;
            
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
                animation: rippleEffect 0.6s ease-out;
            `;
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 0.3;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes cardGlow {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.6; }
    }
`;
document.head.appendChild(rippleStyle);

// Smooth page transitions
function addPageTransitions() {
    // Add loading overlay for page transitions
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.hostname !== window.location.hostname) return;
            
            e.preventDefault();
            
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--bg-primary);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            overlay.innerHTML = `
                <div style="text-align: center; color: white;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🎮</div>
                    <div style="font-size: 1.2rem;">Loading game...</div>
                    <div style="width: 100px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 2px; margin: 1rem auto; overflow: hidden;">
                        <div style="width: 0%; height: 100%; background: var(--neon-blue); border-radius: 2px; animation: loadingBar 1s ease-out forwards;"></div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(overlay);
            
            setTimeout(() => {
                overlay.style.opacity = '1';
            }, 10);
            
            setTimeout(() => {
                window.location.href = link.href;
            }, 800);
        });
    });
}

// Add loading bar animation
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    @keyframes loadingBar {
        0% { width: 0%; }
        100% { width: 100%; }
    }
`;
document.head.appendChild(loadingStyle);

// Initialize page transitions
addPageTransitions();

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                const newImg = new Image();
                newImg.onload = () => {
                    img.style.opacity = '1';
                };
                newImg.src = img.src;
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

initLazyLoading();

// Add some gaming-style console messages
console.log(`
🎮 Welcome to FunnyJourney! 🎮
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Ready to play amazing games?
🚀 All games load instantly!
💯 100% free, no downloads needed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--primary-gradient);
        color: white;
        padding: 2rem;
        border-radius: var(--radius-lg);
        text-align: center;
        z-index: 10000;
        box-shadow: var(--shadow-glow);
        animation: easterEggAppear 0.5s ease-out;
    `;
    
    message.innerHTML = `
        <h3>🎉 Easter Egg Unlocked! 🎉</h3>
        <p>You found the secret! Enjoy 30% faster loading speeds!</p>
        <button onclick="this.parentElement.remove()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: white; color: var(--bg-primary); border: none; border-radius: 20px; cursor: pointer;">
            Awesome!
        </button>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
    @keyframes easterEggAppear {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(easterEggStyle); 