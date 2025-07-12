<template>
  <div id="app">
    <HeaderNav @search="handleSearch" @category-filter="handleCategoryFilter" />
    
    <main class="main-content">
      <router-view />
    </main>
    
    <FooterSection />
  </div>
</template>

<script>
import HeaderNav from './components/HeaderNav.vue'
import FooterSection from './components/FooterSection.vue'

import { analytics } from './utils/analyticsOptimized.js'

export default {
  name: 'App',
  components: {
    HeaderNav,
    FooterSection
  },
  methods: {
    handleSearch(query) {
      // Navigate to games list with search query
      this.$router.push({
        name: 'GamesList',
        query: { search: query }
      })
      
      // Track search for analytics
      analytics.trackSearchQuery(query)
    },
    
    handleCategoryFilter(category) {
      // Navigate to category view
      this.$router.push({
        name: 'Category',
        params: { category }
      })
      
      // Track category selection
      analytics.trackGameCategory(category)
    }
  }
}
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f8fafc;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
}

.main-content {
  margin-top: 80px; /* Account for fixed header */
  min-height: calc(100vh - 80px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #2d3748;
  font-weight: 700;
}

.section-subtitle {
  text-align: center;
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Utility Classes */
.text-center {
  text-align: center;
}

.mb-4 {
  margin-bottom: 2rem;
}

.mb-8 {
  margin-bottom: 4rem;
}

.py-16 {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

/* Button Styles */
.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #5855eb, #7c3aed);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #cbd5e0;
}

/* Animation Classes */
.fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 0.8s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-content {
    margin-top: 70px;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }
  
  .container {
    padding: 0 15px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .section-subtitle {
    font-size: 1rem;
  }
}

/* Loading States */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Focus States for Accessibility */
*:focus {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

button:focus,
a:focus {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}

/* Print Styles */
@media print {
  .header,
  .footer,
  .ad-container {
    display: none;
  }
  
  .main-content {
    margin-top: 0;
  }
}
</style>