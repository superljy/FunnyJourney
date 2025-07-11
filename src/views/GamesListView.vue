<template>
  <div class="games-list-view">
    <div class="games-header">
      <div class="container">
        <h1 class="page-title">🎮 All Games</h1>
        <p class="page-subtitle">
          Discover our complete collection of {{ totalGames }} free online games
        </p>
        
        <!-- Filter Controls -->
        <div class="filter-controls">
          <div class="search-filter">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search games..."
              @input="handleSearch"
              class="search-input"
            />
            <button @click="clearSearch" v-if="searchQuery" class="clear-button">
              ✕
            </button>
          </div>
          
          <div class="category-filter">
            <select v-model="selectedCategory" @change="handleCategoryChange" class="category-select">
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>
          
          <div class="sort-filter">
            <select v-model="sortBy" @change="handleSortChange" class="sort-select">
              <option value="name">Sort by Name</option>
              <option value="category">Sort by Category</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    
    <div class="games-content">
      <div class="container">
        <!-- Results Summary -->
        <div class="results-summary">
          <p v-if="filteredGames.length === totalGames">
            Showing all {{ totalGames }} games
          </p>
          <p v-else>
            Showing {{ filteredGames.length }} of {{ totalGames }} games
            <span v-if="searchQuery"> for "{{ searchQuery }}"</span>
            <span v-if="selectedCategory"> in {{ selectedCategory }}</span>
          </p>
        </div>
        
        <!-- Games Grid -->
        <div v-if="filteredGames.length > 0" class="games-grid">
          <GameCard
            v-for="game in paginatedGames"
            :key="game.id"
            :game="game"
            @click="navigateToGame(game)"
          />
        </div>
        
        <!-- No Results -->
        <div v-else class="no-results">
          <div class="no-results-content">
            <h3>No games found</h3>
            <p v-if="searchQuery">
              No games match your search "{{ searchQuery }}"
            </p>
            <p v-else-if="selectedCategory">
              No games found in {{ selectedCategory }} category
            </p>
            <p v-else>
              No games available
            </p>
            <button @click="clearFilters" class="btn btn-primary">
              Clear Filters
            </button>
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="pagination">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="pagination-btn"
          >
            ← Previous
          </button>
          
          <div class="pagination-numbers">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="['pagination-btn', { active: currentPage === page }]"
            >
              {{ page }}
            </button>
          </div>
          
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="pagination-btn"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from '../components/GameCard.vue'
import { gameUtils, GAME_CATEGORIES } from '../data/games.js'
import { analytics } from '../utils/analytics.js'

export default {
  name: 'GamesListView',
  components: {
    GameCard
  },
  data() {
    return {
      allGames: [],
      filteredGames: [],
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'name',
      currentPage: 1,
      gamesPerPage: 12,
      categories: Object.values(GAME_CATEGORIES)
    }
  },
  computed: {
    totalGames() {
      return this.allGames.length
    },
    
    totalPages() {
      return Math.ceil(this.filteredGames.length / this.gamesPerPage)
    },
    
    paginatedGames() {
      const start = (this.currentPage - 1) * this.gamesPerPage
      const end = start + this.gamesPerPage
      return this.filteredGames.slice(start, end)
    },
    
    visiblePages() {
      const pages = []
      const totalPages = this.totalPages
      const current = this.currentPage
      
      // Always show first page
      pages.push(1)
      
      // Add pages around current page
      const start = Math.max(2, current - 2)
      const end = Math.min(totalPages - 1, current + 2)
      
      if (start > 2) {
        pages.push('...')
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (end < totalPages - 1) {
        pages.push('...')
      }
      
      // Always show last page (if not same as first)
      if (totalPages > 1) {
        pages.push(totalPages)
      }
      
      return pages
    }
  },
  mounted() {
    this.loadGames()
    this.handleURLParams()
  },
  watch: {
    $route: 'handleURLParams'
  },
  methods: {
    loadGames() {
      this.allGames = gameUtils.getAllGames()
      this.filteredGames = [...this.allGames]
      this.applySorting()
    },
    
    handleURLParams() {
      const { category, search, page } = this.$route.query
      
      if (category) {
        this.selectedCategory = category
      }
      
      if (search) {
        this.searchQuery = search
      }
      
      if (page) {
        this.currentPage = parseInt(page) || 1
      }
      
      this.applyFilters()
    },
    
    handleSearch() {
      this.currentPage = 1
      this.applyFilters()
      this.updateURL()
      
      // Track search
      if (this.searchQuery) {
        analytics.trackSearchQuery(this.searchQuery)
      }
    },
    
    handleCategoryChange() {
      this.currentPage = 1
      this.applyFilters()
      this.updateURL()
      
      // Track category filter
      if (this.selectedCategory) {
        analytics.trackGameCategory(this.selectedCategory)
      }
    },
    
    handleSortChange() {
      this.applySorting()
      this.updateURL()
    },
    
    applyFilters() {
      let games = [...this.allGames]
      
      // Apply search filter
      if (this.searchQuery) {
        games = gameUtils.searchGames(this.searchQuery, games)
      }
      
      // Apply category filter
      if (this.selectedCategory) {
        games = games.filter(game => game.category === this.selectedCategory)
      }
      
      this.filteredGames = games
      this.applySorting()
    },
    
    applySorting() {
      switch (this.sortBy) {
        case 'name': {
          this.filteredGames.sort((a, b) => a.title.localeCompare(b.title))
          break
        }
        case 'category': {
          this.filteredGames.sort((a, b) => a.category.localeCompare(b.category))
          break
        }
        case 'difficulty': {
          const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 }
          this.filteredGames.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty])
          break
        }
        case 'featured': {
          this.filteredGames.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
          break
        }
      }
    },
    
    clearSearch() {
      this.searchQuery = ''
      this.handleSearch()
    },
    
    clearFilters() {
      this.searchQuery = ''
      this.selectedCategory = ''
      this.currentPage = 1
      this.applyFilters()
      this.updateURL()
    },
    
    navigateToGame(game) {
      analytics.trackGameClick(game.title)
      this.$router.push(`/game/${game.id}`)
    },
    
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.updateURL()
        this.scrollToTop()
      }
    },
    
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.updateURL()
        this.scrollToTop()
      }
    },
    
    goToPage(page) {
      if (page !== '...' && page !== this.currentPage) {
        this.currentPage = page
        this.updateURL()
        this.scrollToTop()
      }
    },
    
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    
    updateURL() {
      const query = {}
      
      if (this.selectedCategory) {
        query.category = this.selectedCategory
      }
      
      if (this.searchQuery) {
        query.search = this.searchQuery
      }
      
      if (this.currentPage > 1) {
        query.page = this.currentPage
      }
      
      this.$router.replace({ query })
    }
  }
}
</script>

<style scoped>
.games-list-view {
  min-height: calc(100vh - 80px);
}

.games-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
}

.page-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.search-filter {
  position: relative;
}

.search-input {
  width: 300px;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}

.search-input:focus {
  outline: none;
  background: white;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
}

.category-select,
.sort-select {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.games-content {
  padding: 3rem 0;
}

.results-summary {
  text-align: center;
  margin-bottom: 2rem;
  color: #718096;
  font-size: 1.1rem;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.no-results-content {
  text-align: center;
  color: #718096;
}

.no-results-content h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.no-results-content p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
}

.pagination-numbers {
  display: flex;
  gap: 0.5rem;
}

.pagination-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e2e8f0;
  background: white;
  color: #4a5568;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled) {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}

.pagination-btn.active {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #5855eb, #7c3aed);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .filter-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-input {
    width: 100%;
    max-width: 300px;
  }
  
  .games-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .pagination {
    flex-wrap: wrap;
    gap: 0.25rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }
  
  .games-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination-btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>