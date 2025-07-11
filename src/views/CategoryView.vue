<template>
  <div class="category-view">
    <div class="category-header">
      <div class="container">
        <h1 class="page-title">{{ categoryIcon }} {{ categoryName }}</h1>
        <p class="page-subtitle">
          {{ categoryDescription }}
        </p>
        <div class="category-stats">
          <span class="stat">{{ categoryGames.length }} Games</span>
          <span class="stat">{{ difficultyDistribution }}</span>
          <span class="stat">{{ featuredCount }} Featured</span>
        </div>
      </div>
    </div>
    
    <div class="category-content">
      <div class="container">
        <!-- Filter Controls -->
        <div class="filter-controls">
          <div class="search-filter">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="`Search ${categoryName} games...`"
              @input="handleSearch"
              class="search-input"
            />
            <button @click="clearSearch" v-if="searchQuery" class="clear-button">
              ✕
            </button>
          </div>
          
          <div class="difficulty-filter">
            <select v-model="selectedDifficulty" @change="handleDifficultyChange" class="difficulty-select">
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <div class="sort-filter">
            <select v-model="sortBy" @change="handleSortChange" class="sort-select">
              <option value="name">Sort by Name</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="featured">Featured First</option>
            </select>
          </div>
        </div>
        
        <!-- Games Grid -->
        <div v-if="filteredGames.length > 0" class="games-section">
          <div class="games-grid">
            <GameCard
              v-for="game in filteredGames"
              :key="game.id"
              :game="game"
              @click="navigateToGame(game)"
            />
          </div>
        </div>
        
        <!-- No Results -->
        <div v-else class="no-results">
          <div class="no-results-content">
            <h3>No games found</h3>
            <p v-if="searchQuery">
              No {{ categoryName }} games match your search "{{ searchQuery }}"
            </p>
            <p v-else-if="selectedDifficulty">
              No {{ selectedDifficulty }} {{ categoryName }} games found
            </p>
            <p v-else>
              No games available in this category
            </p>
            <button @click="clearFilters" class="btn btn-primary">
              Clear Filters
            </button>
          </div>
        </div>
        
        <!-- Related Categories -->
        <div class="related-categories">
          <h2 class="section-title">🎮 Explore Other Categories</h2>
          <div class="categories-grid">
            <div
              v-for="cat in otherCategories"
              :key="cat.name"
              class="category-card"
              @click="navigateToCategory(cat.name)"
            >
              <div class="category-icon">{{ cat.icon }}</div>
              <h3 class="category-name">{{ cat.name }}</h3>
              <p class="category-count">{{ cat.count }} games</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameCard from '../components/GameCard.vue'
import { gameUtils, GAME_CATEGORIES } from '../data/games.js'
import { analytics } from '../utils/analytics.js'
import { seoManager } from '../utils/seo.js'

export default {
  name: 'CategoryView',
  components: {
    GameCard
  },
  props: {
    category: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      categoryGames: [],
      filteredGames: [],
      searchQuery: '',
      selectedDifficulty: '',
      sortBy: 'name',
      otherCategories: []
    }
  },
  computed: {
    categoryName() {
      return this.category || 'Unknown Category'
    },
    
    categoryIcon() {
      const icons = {
        [GAME_CATEGORIES.PUZZLE]: '🧩',
        [GAME_CATEGORIES.ARCADE]: '🕹️',
        [GAME_CATEGORIES.CARD]: '🃏',
        [GAME_CATEGORIES.STRATEGY]: '⚔️',
        [GAME_CATEGORIES.SPORTS]: '⚽',
        [GAME_CATEGORIES.RACING]: '🏎️',
        [GAME_CATEGORIES.ADVENTURE]: '🗺️',
        [GAME_CATEGORIES.SIMULATION]: '🏗️',
        [GAME_CATEGORIES.CASUAL]: '🎲'
      }
      return icons[this.category] || '🎮'
    },
    
    categoryDescription() {
      const descriptions = {
        [GAME_CATEGORIES.PUZZLE]: 'Challenge your mind with brain-teasing puzzles and logic games',
        [GAME_CATEGORIES.ARCADE]: 'Classic arcade action games for instant fun and excitement',
        [GAME_CATEGORIES.CARD]: 'Traditional and modern card games for all skill levels',
        [GAME_CATEGORIES.STRATEGY]: 'Strategic thinking games that test your planning skills',
        [GAME_CATEGORIES.SPORTS]: 'Sports games featuring your favorite athletic competitions',
        [GAME_CATEGORIES.RACING]: 'Fast-paced racing games with thrilling competitions',
        [GAME_CATEGORIES.ADVENTURE]: 'Explore new worlds and embark on exciting adventures',
        [GAME_CATEGORIES.SIMULATION]: 'Realistic simulation games for immersive experiences',
        [GAME_CATEGORIES.CASUAL]: 'Easy-to-play games perfect for quick entertainment'
      }
      return descriptions[this.category] || 'Discover amazing games in this category'
    },
    
    difficultyDistribution() {
      const difficulties = this.categoryGames.reduce((acc, game) => {
        acc[game.difficulty] = (acc[game.difficulty] || 0) + 1
        return acc
      }, {})
      
      const total = this.categoryGames.length
      const easy = Math.round((difficulties.easy || 0) / total * 100)
      const medium = Math.round((difficulties.medium || 0) / total * 100)
      const hard = Math.round((difficulties.hard || 0) / total * 100)
      
      return `${easy}% Easy, ${medium}% Medium, ${hard}% Hard`
    },
    
    featuredCount() {
      return this.categoryGames.filter(game => game.featured).length
    }
  },
  mounted() {
    this.loadCategoryGames()
    this.setCategorySEO()
  },
  watch: {
    category: {
      immediate: true,
      handler() {
        this.loadCategoryGames()
        this.setCategorySEO()
      }
    }
  },
  methods: {
    loadCategoryGames() {
      this.categoryGames = gameUtils.getGamesByCategory(this.category)
      this.filteredGames = [...this.categoryGames]
      this.loadOtherCategories()
      this.applySorting()
    },
    
    loadOtherCategories() {
      const allCategories = Object.values(GAME_CATEGORIES)
      this.otherCategories = allCategories
        .filter(cat => cat !== this.category)
        .map(cat => ({
          name: cat,
          icon: this.getCategoryIcon(cat),
          count: gameUtils.getGamesByCategory(cat).length
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6)
    },
    
    getCategoryIcon(category) {
      const icons = {
        [GAME_CATEGORIES.PUZZLE]: '🧩',
        [GAME_CATEGORIES.ARCADE]: '🕹️',
        [GAME_CATEGORIES.CARD]: '🃏',
        [GAME_CATEGORIES.STRATEGY]: '⚔️',
        [GAME_CATEGORIES.SPORTS]: '⚽',
        [GAME_CATEGORIES.RACING]: '🏎️',
        [GAME_CATEGORIES.ADVENTURE]: '🗺️',
        [GAME_CATEGORIES.SIMULATION]: '🏗️',
        [GAME_CATEGORIES.CASUAL]: '🎲'
      }
      return icons[category] || '🎮'
    },
    
    setCategorySEO() {
      const title = `${this.categoryName} Games - Free Online ${this.categoryName} Games`
      const description = `Play the best free ${this.categoryName.toLowerCase()} games online! ${this.categoryDescription} ${this.categoryGames.length} games available to play instantly.`
      
      seoManager.setPageMeta({
        title,
        description,
        keywords: [
          `${this.categoryName.toLowerCase()} games`,
          `free ${this.categoryName.toLowerCase()} games`,
          `online ${this.categoryName.toLowerCase()} games`,
          `${this.categoryName.toLowerCase()} games free`,
          'browser games',
          'instant play games'
        ]
      })
      
      // Generate structured data
      seoManager.generateStructuredData({
        type: 'CollectionPage',
        name: `${this.categoryName} Games`,
        description: description,
        url: window.location.href,
        numberOfItems: this.categoryGames.length
      })
    },
    
    handleSearch() {
      this.applyFilters()
      
      if (this.searchQuery) {
        analytics.trackSearchQuery(this.searchQuery)
      }
    },
    
    handleDifficultyChange() {
      this.applyFilters()
    },
    
    handleSortChange() {
      this.applySorting()
    },
    
    applyFilters() {
      let games = [...this.categoryGames]
      
      // Apply search filter
      if (this.searchQuery) {
        games = gameUtils.searchGames(this.searchQuery, games)
      }
      
      // Apply difficulty filter
      if (this.selectedDifficulty) {
        games = games.filter(game => game.difficulty === this.selectedDifficulty)
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
      this.applyFilters()
    },
    
    clearFilters() {
      this.searchQuery = ''
      this.selectedDifficulty = ''
      this.applyFilters()
    },
    
    navigateToGame(game) {
      analytics.trackGameClick(game.title)
      this.$router.push(`/game/${game.id}`)
    },
    
    navigateToCategory(category) {
      analytics.trackGameCategory(category)
      this.$router.push(`/category/${category}`)
    }
  }
}
</script>

<style scoped>
.category-view {
  min-height: calc(100vh - 80px);
}

.category-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.category-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  font-weight: 600;
}

.category-content {
  padding: 3rem 0;
}

.filter-controls {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 3rem;
}

.search-filter {
  position: relative;
}

.search-input {
  width: 300px;
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
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

.difficulty-select,
.sort-select {
  padding: 0.75rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.difficulty-select:focus,
.sort-select:focus {
  outline: none;
  border-color: #6366f1;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
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

.related-categories {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 2px solid #e2e8f0;
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  color: #2d3748;
  font-weight: 700;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.category-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.category-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.category-count {
  color: #718096;
  font-size: 0.9rem;
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
  
  .category-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .filter-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .search-input {
    width: 100%;
    max-width: 300px;
  }
  
  .games-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }
  
  .games-grid {
    grid-template-columns: 1fr;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>