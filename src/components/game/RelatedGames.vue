<template>
  <div class="related-games-section">
    <div class="container">
      <h2 class="section-title">🎮 You Might Also Like</h2>
      
      <div class="games-grid">
        <div
          v-for="game in relatedGames"
          :key="game.id"
          class="game-card"
          @click="navigateToGame(game)"
        >
          <div class="game-thumbnail">
            <img :src="game.image" :alt="game.title" @error="handleImageError" />
            <div class="game-overlay">
              <div class="play-button">
                <span>▶</span>
              </div>
            </div>
          </div>
          
          <div class="game-info">
            <h3 class="game-title">{{ game.title }}</h3>
            <p class="game-category">{{ game.category }}</p>
            <div class="game-meta">
              <span class="difficulty" :class="`difficulty-${game.difficulty}`">
                {{ game.difficulty }}
              </span>
              <span class="featured" v-if="game.featured">⭐</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="view-more">
        <router-link to="/games" class="btn btn-secondary">
          View All Games
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { gameUtils } from '../../data/games.js'
import { analytics } from '../../utils/analytics.js'

export default {
  name: 'RelatedGames',
  props: {
    currentGame: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      relatedGames: []
    }
  },
  mounted() {
    this.loadRelatedGames()
  },
  watch: {
    currentGame: {
      handler() {
        this.loadRelatedGames()
      },
      deep: true
    }
  },
  methods: {
    loadRelatedGames() {
      // Get games from the same category
      const categoryGames = gameUtils.getGamesByCategory(this.currentGame.category)
        .filter(game => game.id !== this.currentGame.id)
      
      // Get some random games from other categories
      const otherGames = gameUtils.getAllGames()
        .filter(game => game.id !== this.currentGame.id && game.category !== this.currentGame.category)
      
      // Combine and shuffle
      const allRelated = [...categoryGames.slice(0, 3), ...gameUtils.getRandomGames(3, [this.currentGame.id])]
      
      // Remove duplicates and limit to 6 games
      const uniqueGames = allRelated.filter((game, index, self) => 
        index === self.findIndex(g => g.id === game.id)
      )
      
      this.relatedGames = uniqueGames.slice(0, 6)
    },
    
    navigateToGame(game) {
      // Track related game click
      analytics.trackGameRelated(this.currentGame.title, game.title)
      
      // Navigate to the game
      this.$router.push(`/game/${game.id}`)
    },
    
    handleImageError(event) {
      event.target.src = '/img/default-game.jpg'
    }
  }
}
</script>

<style scoped>
.related-games-section {
  padding: 4rem 0;
  background: #f8fafc;
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 3rem;
  color: #2d3748;
  font-weight: 700;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.game-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.game-thumbnail {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
}

.game-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.game-card:hover .game-thumbnail img {
  transform: scale(1.05);
}

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.game-card:hover .game-overlay {
  opacity: 1;
}

.play-button {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
  transition: transform 0.3s ease;
}

.game-card:hover .play-button {
  transform: scale(1.1);
}

.game-info {
  padding: 1.5rem;
}

.game-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.game-category {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.game-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.difficulty {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
}

.difficulty-easy {
  background: #dcfce7;
  color: #166534;
}

.difficulty-medium {
  background: #fef3c7;
  color: #92400e;
}

.difficulty-hard {
  background: #fee2e2;
  color: #991b1b;
}

.featured {
  font-size: 1.2rem;
}

.view-more {
  text-align: center;
}

.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary {
  background: #e2e8f0;
  color: #4a5568;
}

.btn-secondary:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .game-info {
    padding: 1rem;
  }
}
</style>