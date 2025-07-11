<template>
  <div class="home-view">
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Search Results -->
    <SearchResults v-if="searchResults.length > 0" :games="searchResults" :query="searchQuery" />
    
    <!-- Category Results -->
    <CategoryResults v-if="categoryFilter" :games="filteredGames" :category="categoryFilter" />
    
    <!-- Stats Section -->
    <StatsSection />
    
    <!-- Featured Games -->
    <GamesSection 
      title="🎯 Featured Games"
      :games="featuredGames"
      :show-all-link="false"
    />
    
    <!-- All Games Preview -->
    <GamesSection 
      title="🎮 Popular Games"
      :games="randomGames"
      :show-all-link="true"
    />
    
    <!-- Ad Space -->
    <AdContainer slot-id="homepage-banner" />
  </div>
</template>

<script>
import HeroSection from '../components/HeroSection.vue'
import StatsSection from '../components/StatsSection.vue'
import GamesSection from '../components/GamesSection.vue'
import SearchResults from '../components/SearchResults.vue'
import CategoryResults from '../components/CategoryResults.vue'
import AdContainer from '../components/AdContainer.vue'

import { analytics } from '../utils/analytics.js'
import { seoManager } from '../utils/seo.js'
import { gameUtils } from '../data/games.js'

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    StatsSection,
    GamesSection,
    SearchResults,
    CategoryResults,
    AdContainer
  },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      categoryFilter: '',
      filteredGames: [],
      featuredGames: [],
      randomGames: []
    }
  },
  mounted() {
    this.initializeHome()
    this.loadGames()
    this.setupEventListeners()
  },
  methods: {
    initializeHome() {
      // Generate structured data for homepage
      seoManager.generateStructuredData({
        type: 'WebSite',
        name: 'FunnyJourney - Free Online Games',
        description: 'Play 500+ free online games instantly! No downloads, no registration required.',
        url: window.location.href
      })
      
      // Track homepage view
      analytics.trackPageView('Homepage')
    },
    
    loadGames() {
      // Load featured games
      this.featuredGames = gameUtils.getFeaturedGames()
      
      // Load random games for variety
      this.randomGames = gameUtils.getRandomGames(6)
      
      // Refresh random games every 30 seconds
      setInterval(() => {
        this.randomGames = gameUtils.getRandomGames(6)
      }, 30000)
    },
    
    setupEventListeners() {
      // Listen for search events from HeaderNav
      this.$root.$on('search', this.handleSearch)
      this.$root.$on('category-filter', this.handleCategoryFilter)
    },
    
    handleSearch(query) {
      this.searchQuery = query
      this.searchResults = gameUtils.searchGames(query)
      this.categoryFilter = '' // Clear category filter when searching
      
      // Track search for analytics
      analytics.trackSearchQuery(query)
      
      // Scroll to results
      this.$nextTick(() => {
        const resultsElement = document.querySelector('.search-results')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' })
        }
      })
    },
    
    handleCategoryFilter(category) {
      this.categoryFilter = category
      this.filteredGames = gameUtils.getGamesByCategory(category)
      this.searchQuery = '' // Clear search when filtering
      this.searchResults = []
      
      // Track category selection
      analytics.trackGameCategory(category)
      
      // Scroll to results
      this.$nextTick(() => {
        const resultsElement = document.querySelector('.category-results')
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' })
        }
      })
    }
  },
  
  beforeUnmount() {
    // Clean up event listeners
    this.$root.$off('search', this.handleSearch)
    this.$root.$off('category-filter', this.handleCategoryFilter)
  }
}
</script>

<style scoped>
.home-view {
  min-height: calc(100vh - 80px);
}
</style>