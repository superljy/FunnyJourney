<template>
  <section id="home" class="hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">
          🎮 Free Online Games 2025 - Play 500+ Games Instantly!
        </h1>
        <p class="hero-description">
          Discover amazing browser games! No downloads, no registration. Enjoy card games, puzzles, arcade classics & more. Join 500K+ happy players worldwide!
        </p>
        
        <div class="hero-features">
          <div class="feature-item">
            <span class="feature-icon">⚡</span>
            <span>Instant Play</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📱</span>
            <span>All Devices</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🆓</span>
            <span>100% Free</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🚫</span>
            <span>No Downloads</span>
          </div>
        </div>
        
        <div class="hero-buttons">
          <a href="games/index.html" class="cta-button primary" aria-label="Start playing free online games">
            🎮 Start Playing Now
          </a>
          <button @click="scrollToGames" class="cta-button secondary" aria-label="Browse featured games">
            Browse Games
          </button>
        </div>
        
        <div class="hero-keywords">
          <span class="keyword-tag">Free Online Games</span>
          <span class="keyword-tag">No Download Games</span>
          <span class="keyword-tag">Browser Games</span>
          <span class="keyword-tag">Instant Play Games</span>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="game-icons">
          <div class="game-icon">🎯</div>
          <div class="game-icon">🃏</div>
          <div class="game-icon">🧩</div>
          <div class="game-icon">🏎️</div>
          <div class="game-icon">🎪</div>
          <div class="game-icon">⚔️</div>
        </div>
      </div>
    </div>
    
    <!-- Floating particles for visual appeal -->
    <div class="particles">
      <div class="particle" v-for="n in 20" :key="n" :style="getParticleStyle(n)"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  methods: {
    scrollToGames() {
      const gamesSection = document.getElementById('games')
      if (gamesSection) {
        gamesSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
    
    getParticleStyle(index) {
      return {
        left: Math.random() * 100 + '%',
        animationDelay: Math.random() * 20 + 's',
        animationDuration: (Math.random() * 3 + 2) + 's'
      }
    }
  }
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.container {
  position: relative;
  z-index: 2;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.hero-description {
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  line-height: 1.6;
  text-shadow: 0 1px 5px rgba(0,0,0,0.2);
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-3px);
  background: rgba(255,255,255,0.15);
}

.feature-icon {
  font-size: 1.2rem;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  min-width: 200px;
}

.cta-button.primary {
  background: white;
  color: #667eea;
}

.cta-button.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.3);
  background: #f8fafc;
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-button.secondary:hover {
  background: white;
  color: #667eea;
  transform: translateY(-3px);
}

.hero-keywords {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.keyword-tag {
  background: rgba(255,255,255,0.15);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(5px);
}

.hero-visual {
  margin-top: 4rem;
}

.game-icons {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.game-icon {
  font-size: 3rem;
  background: rgba(255,255,255,0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  animation: float 6s ease-in-out infinite;
}

.game-icon:nth-child(odd) {
  animation-delay: -2s;
}

.game-icon:nth-child(even) {
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
  animation: particle-float linear infinite;
}

@keyframes particle-float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    padding: 100px 0 60px;
    min-height: 90vh;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  .hero-features {
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .feature-item {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .cta-button {
    min-width: 250px;
    padding: 0.875rem 2rem;
  }
  
  .game-icons {
    gap: 1rem;
  }
  
  .game-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
  
  .hero-features {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-keywords {
    justify-content: center;
  }
  
  .keyword-tag {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .game-icon,
  .particle {
    animation: none;
  }
  
  .cta-button:hover {
    transform: none;
  }
}
</style>