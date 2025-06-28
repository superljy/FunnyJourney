<template>
  <header class="header" :class="{ 'scrolled': isScrolled }">
    <div class="container">
      <nav class="nav">
        <div class="logo" @click="goHome">
          🎮 FunnyJourney
        </div>
        
        <div class="nav-center">
          <div class="search-container" v-if="showSearch">
            <input 
              type="text" 
              placeholder="Search free online games..."
              v-model="searchQuery"
              @input="handleSearch"
              @keyup.enter="performSearch"
              class="search-input"
              aria-label="Search for free online games"
            />
            <button @click="performSearch" class="search-button" aria-label="Search games">
              🔍
            </button>
          </div>
        </div>
        
        <ul class="nav-links" :class="{ 'mobile-open': mobileMenuOpen }">
          <li><a href="#home" @click="scrollToSection('home')">Home</a></li>
          <li><a href="games/index.html">All Games</a></li>
          <li class="dropdown" @mouseenter="showCategories = true" @mouseleave="showCategories = false">
            <a href="#" @click.prevent>Categories ▼</a>
            <div class="dropdown-menu" v-show="showCategories">
              <a v-for="category in categories" :key="category" @click="filterByCategory(category)">
                {{ formatCategory(category) }}
              </a>
            </div>
          </li>
          <li><a href="about/index.html">About</a></li>
        </ul>
        
        <button 
          class="mobile-menu-toggle"
          @click="toggleMobileMenu"
          :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
        >
          <span :class="{ 'open': mobileMenuOpen }"></span>
          <span :class="{ 'open': mobileMenuOpen }"></span>
          <span :class="{ 'open': mobileMenuOpen }"></span>
        </button>
      </nav>
    </div>
  </header>
</template>

<script>
import { analytics } from '../utils/analytics.js'
import { GAME_CATEGORIES } from '../data/games.js'

export default {
  name: 'HeaderNav',
  props: {
    showSearch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isScrolled: false,
      mobileMenuOpen: false,
      showCategories: false,
      searchQuery: '',
      categories: Object.values(GAME_CATEGORIES)
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.mobileMenuOpen = false
      }
    })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    
    goHome() {
      if (window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) {
        this.scrollToSection('home')
      } else {
        window.location.href = '../index.html'
      }
    },
    
    scrollToSection(sectionId) {
      this.mobileMenuOpen = false
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
    
    handleSearch() {
      if (this.searchQuery.length > 2) {
        // Track search query for SEO analytics
        analytics.trackSearchQuery(this.searchQuery)
      }
    },
    
    performSearch() {
      if (this.searchQuery.trim()) {
        analytics.trackSearchQuery(this.searchQuery)
        // Emit search event to parent component
        this.$emit('search', this.searchQuery.trim())
        this.mobileMenuOpen = false
      }
    },
    
    filterByCategory(category) {
      analytics.trackGameCategory(category)
      this.$emit('category-filter', category)
      this.showCategories = false
      this.mobileMenuOpen = false
    },
    
    formatCategory(category) {
      return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }
}
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

.header.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  position: relative;
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #6366f1;
  cursor: pointer;
  transition: color 0.3s ease;
}

.logo:hover {
  color: #5855eb;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
  margin: 0 2rem;
}

.search-container {
  position: relative;
  max-width: 400px;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.search-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: #6366f1;
  color: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  background: #5855eb;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.nav-links a:hover {
  color: #6366f1;
}

.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  min-width: 150px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  border-radius: 8px;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
}

.dropdown-menu a {
  display: block;
  padding: 0.75rem 1rem;
  color: #4a5568;
  text-decoration: none;
  transition: background 0.3s ease;
}

.dropdown-menu a:hover {
  background: #f7fafc;
  color: #6366f1;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 3px;
  background: #4a5568;
  border-radius: 3px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.mobile-menu-toggle span.open:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-toggle span.open:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle span.open:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .nav-center {
    display: none;
  }
  
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    gap: 0;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .nav-links.mobile-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-links li {
    border-bottom: 1px solid #e2e8f0;
  }
  
  .nav-links li:last-child {
    border-bottom: none;
  }
  
  .nav-links a {
    display: block;
    padding: 1rem 0;
  }
  
  .dropdown-menu {
    position: static;
    box-shadow: none;
    background: #f7fafc;
    margin: 0;
    border-radius: 0;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .logo {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .nav {
    padding: 0.75rem 0;
  }
  
  .logo {
    font-size: 1.3rem;
  }
}
</style>