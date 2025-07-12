<template>
  <div class="game-card" @click="playGame" :class="{ 'featured': game.featured }">
    <div class="game-image-container">
      <OptimizedImage
        :src="game.image" 
        :alt="`${game.title} - Free Online Game | Play Instantly on FunnyJourney`"
        :lazy="lazy"
        :priority="game.featured"
        :width="300"
        :height="200"
        class="game-image"
        @error="handleImageError"
      />
      <div class="game-overlay">
        <button class="play-button" :aria-label="`Play ${game.title} game now`">
          🎮 Play Now
        </button>
      </div>
      <div v-if="game.featured" class="featured-badge">
        ⭐ Featured
      </div>
      <div class="difficulty-badge" :class="`difficulty-${game.difficulty}`">
        {{ game.difficulty }}
      </div>
    </div>
    
    <div class="game-content">
      <h3 class="game-title">{{ game.title }}</h3>
      <p class="game-description">{{ game.description }}</p>
      
      <div class="game-meta">
        <span class="game-category">{{ formatCategory(game.category) }}</span>
        <span class="game-playtime">{{ game.playTime }}</span>
      </div>
      
      <div class="game-keywords" v-if="showKeywords">
        <span v-for="keyword in game.keywords.slice(0, 3)" :key="keyword" class="keyword-tag">
          {{ keyword }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { analytics } from '../utils/analytics.js'
import OptimizedImage from './OptimizedImage.vue'

export default {
  name: 'GameCard',
  components: {
    OptimizedImage
  },
  props: {
    game: {
      type: Object,
      required: true
    },
    lazy: {
      type: Boolean,
      default: true
    },
    showKeywords: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    playGame() {
      // Track game start
      analytics.trackGameStart(this.game.title);
      analytics.trackGameCategory(this.game.category);
      
      // Navigate to game using Vue Router
      this.$router.push(`/game/${this.game.id}`);
    },
    
    handleImageError(event) {
      // Fallback image if game image fails to load
      event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5HYW1lIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
    },
    
    formatCategory(category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
  }
}
</script>

<style scoped>
.game-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15);
}

.game-card.featured {
  border: 2px solid #6366f1;
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.2);
}

.game-image-container {
  position: relative;
  overflow: hidden;
}

.game-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.game-card:hover .game-image {
  transform: scale(1.05);
}

.game-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
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
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(10px);
}

.game-card:hover .play-button {
  transform: translateY(0);
}

.play-button:hover {
  background: linear-gradient(45deg, #5855eb, #7c3aed);
  transform: scale(1.05);
}

.featured-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(45deg, #f59e0b, #f97316);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.difficulty-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.difficulty-easy {
  background: #10b981;
  color: white;
}

.difficulty-medium {
  background: #f59e0b;
  color: white;
}

.difficulty-hard {
  background: #ef4444;
  color: white;
}

.game-content {
  padding: 1.5rem;
}

.game-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
  line-height: 1.3;
}

.game-description {
  color: #718096;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.game-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
}

.game-category {
  background: #e2e8f0;
  color: #4a5568;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.game-playtime {
  color: #718096;
  font-weight: 500;
}

.game-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.keyword-tag {
  background: #f7fafc;
  color: #4a5568;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 0.75rem;
  border: 1px solid #e2e8f0;
}

/* Responsive design */
@media (max-width: 768px) {
  .game-content {
    padding: 1rem;
  }
  
  .game-title {
    font-size: 1.1rem;
  }
  
  .game-description {
    font-size: 0.9rem;
  }
}
</style>