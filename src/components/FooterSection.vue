<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>🎮 FunnyJourney</h3>
          <p>The ultimate destination for free, instant browser games. No downloads, no limits, just pure gaming fun!</p>
          
          <div class="footer-keywords">
            <span>Free Online Games</span>
            <span>Browser Games</span>
            <span>No Download Games</span>
          </div>
        </div>
        
        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/games">All Games</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Game Categories</h3>
          <ul>
            <li><router-link to="/category/puzzle">Puzzle Games</router-link></li>
            <li><router-link to="/category/arcade">Arcade Games</router-link></li>
            <li><router-link to="/category/card">Card Games</router-link></li>
            <li><router-link to="/category/action">Action Games</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Partner Sites</h3>
          <ul>
            <li><a href="https://www.inspirationstudio.net/" target="_blank" rel="noopener noreferrer">⭐ Horoscope</a></li>
            <li><a href="https://tarot.inspirationstudio.net/" target="_blank" rel="noopener noreferrer">💕 Love Tarot</a></li>
            <li><a href="https://www.getartiflow.com/" target="_blank" rel="noopener noreferrer">🎨 AI Image Generation</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><router-link to="/about#privacy">Privacy Policy</router-link></li>
            <li><router-link to="/about#terms">Terms of Service</router-link></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 FunnyJourney.com. All rights reserved. | 🎮 Play more, stress less!</p>
        <div class="footer-seo">
          <small>Free online games, browser games, instant play games, no download required</small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection'
}
</script>

<style scoped>
.footer {
  background: #2d3748;
  color: white;
  padding: 40px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (min-width: 1200px) {
  .footer-content {
    grid-template-columns: repeat(5, 1fr);
  }
}

.footer-section h3 {
  margin-bottom: 1rem;
  color: #6366f1;
  font-size: 1.2rem;
}

.footer-section p {
  color: #a0aec0;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #a0aec0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: white;
}

.footer-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.footer-keywords span {
  background: rgba(99, 102, 241, 0.2);
  color: #c3dafe;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
}

.footer-bottom {
  border-top: 1px solid #4a5568;
  padding-top: 1rem;
  text-align: center;
  color: #a0aec0;
}

.footer-seo {
  margin-top: 0.5rem;
}

.footer-seo small {
  color: #718096;
  font-size: 0.7rem;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-keywords {
    justify-content: center;
  }
}
</style>