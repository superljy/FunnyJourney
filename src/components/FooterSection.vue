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
            <li><a href="../index.html">Home</a></li>
            <li><a href="games/index.html">All Games</a></li>
            <li><a href="about/index.html">About Us</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Game Categories</h3>
          <ul>
            <li><a href="#" @click="$emit('category-filter', 'puzzle')">Puzzle Games</a></li>
            <li><a href="#" @click="$emit('category-filter', 'arcade')">Arcade Games</a></li>
            <li><a href="#" @click="$emit('category-filter', 'card')">Card Games</a></li>
            <li><a href="#" @click="$emit('category-filter', 'action')">Action Games</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a href="about/index.html#privacy">Privacy Policy</a></li>
            <li><a href="about/index.html#terms">Terms of Service</a></li>
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
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