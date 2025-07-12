<template>
  <div class="about-view">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="container">
        <h1 class="hero-title">About FunnyJourney</h1>
        <p class="hero-subtitle">
          Your Ultimate Destination for Free Online Games
        </p>
        <div class="hero-features">
          <div class="feature">
            <span class="feature-icon">🎮</span>
            <span>500+ Games</span>
          </div>
          <div class="feature">
            <span class="feature-icon">🆓</span>
            <span>100% Free</span>
          </div>
          <div class="feature">
            <span class="feature-icon">⚡</span>
            <span>Instant Play</span>
          </div>
          <div class="feature">
            <span class="feature-icon">📱</span>
            <span>All Devices</span>
          </div>
        </div>
      </div>
    </section>

    <!-- About Content -->
    <section class="about-content">
      <div class="container">
        <div class="content-grid">
          <!-- Our Mission -->
          <div class="content-card">
            <h2>🎯 Our Mission</h2>
            <p>
              FunnyJourney is dedicated to bringing you the best free online gaming experience. 
              We believe that everyone deserves access to high-quality entertainment without 
              barriers like downloads, registrations, or payments.
            </p>
            <p>
              Our carefully curated collection of 500+ browser games spans multiple categories, 
              from classic arcade games to modern puzzle adventures, ensuring there's something 
              for every type of gamer.
            </p>
          </div>

          <!-- What We Offer -->
          <div class="content-card">
            <h2>🎪 What We Offer</h2>
            <ul class="feature-list">
              <li>
                <strong>Instant Play:</strong> No downloads or installations required - 
                click and play immediately in your browser
              </li>
              <li>
                <strong>Free Forever:</strong> All games are completely free with no 
                hidden costs or premium subscriptions
              </li>
              <li>
                <strong>Cross-Platform:</strong> Play on desktop, tablet, or mobile - 
                our games work on all devices
              </li>
              <li>
                <strong>No Registration:</strong> Jump straight into the fun without 
                creating accounts or sharing personal information
              </li>
              <li>
                <strong>Regular Updates:</strong> New games added regularly to keep 
                the collection fresh and exciting
              </li>
            </ul>
          </div>

          <!-- Game Categories -->
          <div class="content-card">
            <h2>🎨 Game Categories</h2>
            <div class="categories-grid">
              <div class="category-item">
                <span class="category-icon">🧩</span>
                <div>
                  <h3>Puzzle Games</h3>
                  <p>Challenge your mind with brain-teasing puzzles and logic games</p>
                </div>
              </div>
              <div class="category-item">
                <span class="category-icon">🕹️</span>
                <div>
                  <h3>Arcade Games</h3>
                  <p>Classic arcade action for instant fun and nostalgia</p>
                </div>
              </div>
              <div class="category-item">
                <span class="category-icon">🃏</span>
                <div>
                  <h3>Card Games</h3>
                  <p>Traditional solitaire and modern card game variations</p>
                </div>
              </div>
              <div class="category-item">
                <span class="category-icon">⚔️</span>
                <div>
                  <h3>Action Games</h3>
                  <p>Fast-paced adventures and thrilling combat experiences</p>
                </div>
              </div>
              <div class="category-item">
                <span class="category-icon">🎲</span>
                <div>
                  <h3>Casual Games</h3>
                  <p>Easy-to-learn games perfect for quick entertainment</p>
                </div>
              </div>
              <div class="category-item">
                <span class="category-icon">🏎️</span>
                <div>
                  <h3>Racing Games</h3>
                  <p>High-speed racing and driving simulations</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Technology -->
          <div class="content-card">
            <h2>💻 Technology</h2>
            <p>
              FunnyJourney is built using modern web technologies to ensure the best 
              possible gaming experience:
            </p>
            <ul class="tech-list">
              <li><strong>Vue.js 3:</strong> Modern, reactive user interface</li>
              <li><strong>Progressive Web App:</strong> Fast loading and offline capability</li>
              <li><strong>Responsive Design:</strong> Optimized for all screen sizes</li>
              <li><strong>SEO Optimized:</strong> Easy to discover through search engines</li>
              <li><strong>Performance First:</strong> Optimized for speed and reliability</li>
            </ul>
          </div>

          <!-- Community -->
          <div class="content-card">
            <h2>🌟 Join Our Community</h2>
            <p>
              With over 500,000 players worldwide, FunnyJourney has become a trusted 
              destination for free online gaming. Join our growing community and discover 
              why millions of players choose us for their gaming entertainment.
            </p>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">500K+</div>
                <div class="stat-label">Happy Players</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">500+</div>
                <div class="stat-label">Free Games</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">99.9%</div>
                <div class="stat-label">Uptime</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="container">
        <h2>Ready to Start Playing?</h2>
        <p>Join millions of players and discover your next favorite game today!</p>
        <div class="cta-buttons">
          <router-link to="/games" class="btn btn-primary">
            🎮 Browse All Games
          </router-link>
          <router-link to="/" class="btn btn-secondary">
            🏠 Back to Home
          </router-link>
        </div>
      </div>
    </section>

    <!-- Privacy & Terms -->
    <section class="legal-section">
      <div class="container">
        <div class="legal-grid">
          <div class="legal-card">
            <h3 id="privacy">🔒 Privacy Policy</h3>
            <p>
              We respect your privacy and are committed to protecting your personal information. 
              FunnyJourney collects minimal data necessary for website functionality and analytics.
            </p>
            <ul>
              <li>We don't require registration or personal information</li>
              <li>We use cookies only for website functionality and analytics</li>
              <li>We don't sell or share your data with third parties</li>
              <li>All data is processed securely and anonymously</li>
            </ul>
          </div>

          <div class="legal-card">
            <h3 id="terms">📋 Terms of Service</h3>
            <p>
              By using FunnyJourney, you agree to our terms of service. Our platform is 
              designed to provide safe, family-friendly gaming entertainment.
            </p>
            <ul>
              <li>All games are provided free of charge</li>
              <li>Content is suitable for all ages</li>
              <li>No harmful or offensive content is allowed</li>
              <li>We reserve the right to modify or remove games</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { analytics } from '../utils/analytics.js'
import { seoManager } from '../utils/seo.js'

export default {
  name: 'AboutView',
  mounted() {
    this.setAboutSEO()
    this.trackPageView()
  },
  methods: {
    setAboutSEO() {
      seoManager.setPageMeta({
        title: 'About FunnyJourney - Free Online Games Platform | 500+ Browser Games',
        description: 'Learn about FunnyJourney, your ultimate destination for free online games. Discover our mission, 500+ game collection, and commitment to providing the best browser gaming experience.',
        keywords: [
          'about FunnyJourney',
          'free online games platform',
          'browser games website',
          'online gaming community',
          'free games collection',
          'instant play games',
          'no download games',
          'gaming platform',
          'web games',
          'casual games'
        ]
      })

      // Generate structured data for About page
      seoManager.generateStructuredData({
        type: 'AboutPage',
        name: 'About FunnyJourney',
        description: 'Learn about FunnyJourney, your ultimate destination for free online games',
        url: window.location.href,
        mainEntity: {
          '@type': 'Organization',
          name: 'FunnyJourney',
          description: 'Free online games platform with 500+ browser games',
          url: 'https://www.funnyjourney.com/',
          sameAs: [],
          foundingDate: '2024',
          numberOfEmployees: '5-10'
        }
      })
    },

    trackPageView() {
      analytics.trackPageView('About')
    }
  }
}
</script>

<style scoped>
.about-view {
  min-height: calc(100vh - 80px);
}

.about-hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.hero-features {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.feature {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  backdrop-filter: blur(10px);
}

.feature-icon {
  font-size: 1.2rem;
}

.about-content {
  padding: 4rem 0;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.content-card {
  background: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.content-card h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: #2d3748;
}

.content-card p {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
  color: #4a5568;
  line-height: 1.6;
}

.feature-list li:before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.category-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
}

.category-icon {
  font-size: 1.5rem;
  margin-top: 0.2rem;
}

.category-item h3 {
  margin: 0 0 0.5rem 0;
  color: #2d3748;
  font-size: 1.1rem;
}

.category-item p {
  margin: 0;
  font-size: 0.9rem;
  color: #718096;
}

.tech-list {
  list-style: none;
  padding: 0;
}

.tech-list li {
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  color: #4a5568;
  line-height: 1.6;
}

.tech-list li:before {
  content: "⚡";
  position: absolute;
  left: 0;
  color: #6366f1;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #718096;
  font-weight: 500;
}

.cta-section {
  background: #f8fafc;
  padding: 4rem 0;
  text-align: center;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.cta-section p {
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #5855eb, #7c3aed);
  transform: translateY(-2px);
}

.btn-secondary {
  background: white;
  color: #6366f1;
  border: 2px solid #6366f1;
}

.btn-secondary:hover {
  background: #6366f1;
  color: white;
}

.legal-section {
  padding: 4rem 0;
  background: #2d3748;
  color: white;
}

.legal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.legal-card {
  background: #4a5568;
  padding: 2rem;
  border-radius: 12px;
}

.legal-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #e2e8f0;
}

.legal-card p {
  color: #cbd5e0;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.legal-card ul {
  list-style: none;
  padding: 0;
}

.legal-card li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  color: #cbd5e0;
  line-height: 1.6;
}

.legal-card li:before {
  content: "•";
  position: absolute;
  left: 0;
  color: #6366f1;
  font-weight: bold;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-features {
    flex-direction: column;
    align-items: center;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .legal-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .content-card {
    padding: 1.5rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .cta-section h2 {
    font-size: 2rem;
  }
}
</style> 