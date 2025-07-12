<template>
  <div class="game-detail-view">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading game...</p>
    </div>
    
    <div v-else-if="game" class="game-content">
      <!-- Game Header -->
      <div class="game-header">
        <div class="container">
          <div class="game-info">
            <div class="game-thumbnail">
              <img :src="game.image" :alt="game.title" @error="handleImageError" />
              <div class="game-badge" v-if="game.featured">
                <span>⭐ Featured</span>
              </div>
              <div class="difficulty-badge" :class="`difficulty-${game.difficulty}`">
                {{ game.difficulty }}
              </div>
            </div>
            
            <div class="game-details">
              <h1 class="game-title">{{ game.title }}</h1>
              <p class="game-description">{{ game.description }}</p>
              
              <div class="game-meta">
                <span class="category">📁 {{ game.category }}</span>
                <span class="play-time" v-if="game.playTime">⏱️ {{ game.playTime }}</span>
                <span class="difficulty">🎯 {{ game.difficulty }}</span>
              </div>
              
              <div class="game-actions">
                <button @click="startGame" class="btn btn-primary play-button">
                  🎮 Play Now
                </button>
                <button @click="toggleFullscreen" class="btn btn-secondary">
                  🔍 Fullscreen
                </button>
                <button @click="shareGame" class="btn btn-secondary">
                  📤 Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Game Container -->
      <div class="game-container" ref="gameContainer">
        <GameIframe 
          :game="game" 
          :is-playing="isPlaying"
          :is-fullscreen="isFullscreen"
          @game-start="startGame"
          @game-loaded="handleGameLoaded"
          @game-error="handleGameError"
        />
      </div>
      
      <!-- Game Information -->
      <div class="game-info-section">
        <div class="container">
          <div class="info-grid">
            <!-- Game Instructions -->
            <div class="info-card" v-if="game.instructions">
              <h3>🎯 How to Play</h3>
              <ul>
                <li v-for="instruction in game.instructions" :key="instruction">
                  {{ instruction }}
                </li>
              </ul>
            </div>
            
            <!-- Game Features -->
            <div class="info-card" v-if="game.features">
              <h3>✨ Game Features</h3>
              <ul>
                <li v-for="feature in game.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
            </div>
            
            <!-- Game Tips -->
            <div class="info-card" v-if="game.tips">
              <h3>💡 Pro Tips</h3>
              <ul>
                <li v-for="tip in game.tips" :key="tip">
                  {{ tip }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Related Games -->
      <RelatedGames :current-game="game" />
      
      <!-- Ad Space -->
      <AdContainer slot-id="game-detail-banner" />
    </div>
    
    <div v-else class="game-not-found">
      <div class="container">
        <h1>Game Not Found</h1>
        <p>Sorry, the game you're looking for doesn't exist.</p>
        <router-link to="/" class="btn btn-primary">
          🏠 Back to Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import GameIframe from '../components/game/GameIframe.vue'
import RelatedGames from '../components/game/RelatedGames.vue'
import AdContainer from '../components/AdContainer.vue'

import { analytics } from '../utils/analytics.js'
import { seoManager } from '../utils/seo.js'
import { gameUtils } from '../data/games.js'

export default {
  name: 'GameDetailView',
  components: {
    GameIframe,
    RelatedGames,
    AdContainer
  },
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      game: null,
      loading: true,
      isPlaying: false,
      isFullscreen: false
    }
  },
  async mounted() {
    await this.loadGame()
  },
  watch: {
    gameId: {
      immediate: true,
      async handler(newGameId) {
        if (newGameId) {
          await this.loadGame()
        }
      }
    }
  },
  methods: {
    async loadGame() {
      this.loading = true
      
      try {
        // Find game in database
        this.game = gameUtils.getGameById(this.gameId)
        
        if (this.game) {
          // Set dynamic SEO meta tags
          this.setGameSEO()
          
          // Track game view
          analytics.trackGameView(this.game.title)
        }
      } catch (error) {
        console.error('Error loading game:', error)
        this.game = null
      } finally {
        this.loading = false
      }
    },
    
    setGameSEO() {
      if (!this.game) return
      
      // Use enhanced SEO meta data if available, otherwise fallback to generated
      const seoMeta = this.game.seoMeta || {}
      const title = seoMeta.title || seoManager.generateGameTitle(this.game.title)
      const description = seoMeta.description || `Play ${this.game.title} online for free! ${this.game.description} No download required - start playing instantly!`
      const keywords = seoMeta.keywords || [
        this.game.title.toLowerCase(),
        `${this.game.title} game`,
        `play ${this.game.title} online`,
        'free online game',
        this.game.category.toLowerCase(),
        ...this.game.keywords
      ]
      
      // Set page meta tags
      seoManager.setPageMeta({
        title,
        description,
        keywords
      })
      
      // Generate structured data for the game
      seoManager.generateStructuredData({
        type: 'VideoGame',
        name: this.game.title,
        description: this.game.description,
        image: this.game.image,
        genre: this.game.category,
        url: window.location.href,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'InStock'
        }
      })
    },
    
    startGame() {
      this.isPlaying = true
      analytics.trackGameStart(this.game.title)
    },
    
    toggleFullscreen() {
      if (!this.isFullscreen) {
        // 进入全屏
        this.requestFullscreen()
      } else {
        // 退出全屏
        this.exitFullscreen()
      }
    },
    
    async requestFullscreen() {
      try {
        const element = this.$refs.gameContainer
        if (element) {
          // 检查不同的fullscreen API
          if (element.requestFullscreen) {
            await element.requestFullscreen()
          } else if (element.webkitRequestFullscreen) {
            await element.webkitRequestFullscreen()
          } else if (element.msRequestFullscreen) {
            await element.msRequestFullscreen()
          } else if (element.mozRequestFullScreen) {
            await element.mozRequestFullScreen()
          }
          
          this.isFullscreen = true
          analytics.trackGameFullscreen(this.game.title, true)
        }
      } catch (error) {
        console.error('Error entering fullscreen:', error)
        // 如果全屏失败，可以显示提示
        this.$emit('fullscreen-error', 'Unable to enter fullscreen mode')
      }
    },
    
    async exitFullscreen() {
      try {
        // 检查不同的退出全屏API
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          await document.mozCancelFullScreen()
        }
        
        this.isFullscreen = false
        analytics.trackGameFullscreen(this.game.title, false)
      } catch (error) {
        console.error('Error exiting fullscreen:', error)
      }
    },
    
    handleFullscreenChange() {
      // 检测全屏状态变化
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement
      )
      
      this.isFullscreen = isCurrentlyFullscreen
      
      if (!isCurrentlyFullscreen) {
        // 用户通过ESC键退出全屏
        analytics.trackGameFullscreen(this.game.title, false)
      }
    },
    
    shareGame() {
      if (navigator.share) {
        navigator.share({
          title: this.game.title,
          text: `Play ${this.game.title} - ${this.game.description}`,
          url: window.location.href
        })
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href)
        alert('Game link copied to clipboard!')
      }
      
      analytics.trackGameShare(this.game.title)
    },
    
    handleGameLoaded() {
      analytics.trackGameLoaded(this.game.title)
    },
    
    handleGameError(error) {
      console.error('Game loading error:', error)
      analytics.trackGameError(this.game.title, error)
    },
    
    handleImageError(event) {
      event.target.src = '/img/default-game.jpg' // Fallback image
    }
  },
  
  mounted() {
    // 监听全屏状态变化
    document.addEventListener('fullscreenchange', this.handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange)
    document.addEventListener('msfullscreenchange', this.handleFullscreenChange)
    document.addEventListener('mozfullscreenchange', this.handleFullscreenChange)
  },
  
  beforeUnmount() {
    // 清理事件监听器
    document.removeEventListener('fullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('msfullscreenchange', this.handleFullscreenChange)
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenChange)
    
    // 如果组件销毁时还在全屏状态，退出全屏
    if (this.isFullscreen) {
      this.exitFullscreen()
    }
  }
}
</script>

<style scoped>
.game-detail-view {
  min-height: calc(100vh - 80px);
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: 1rem;
}

.game-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
}

.game-info {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 2rem;
  align-items: start;
}

.game-thumbnail {
  position: relative;
}

.game-thumbnail img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.game-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #333;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.4);
}

.difficulty-badge {
  position: absolute;
  bottom: -10px;
  left: -10px;
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
}

.difficulty-easy {
  background: linear-gradient(45deg, #10b981, #34d399);
  color: white;
}

.difficulty-medium {
  background: linear-gradient(45deg, #f59e0b, #fbbf24);
  color: white;
}

.difficulty-hard {
  background: linear-gradient(45deg, #ef4444, #f87171);
  color: white;
}

.game-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.game-description {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  line-height: 1.6;
}

.game-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.game-meta span {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
}

.game-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.play-button {
  font-size: 1.1rem;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #10b981, #059669);
  border: none;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.play-button:hover {
  background: linear-gradient(45deg, #059669, #047857);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
}

.game-container {
  margin: 2rem 0;
  min-height: 500px;
}

.game-info-section {
  background: #f8fafc;
  padding: 3rem 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.info-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.info-card h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.info-card ul {
  list-style: none;
  padding: 0;
}

.info-card li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
  color: #4a5568;
}

.info-card li:before {
  content: "▶ ";
  color: #6366f1;
  font-weight: bold;
  margin-right: 0.5rem;
}

.game-not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  text-align: center;
}

.game-not-found h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.game-not-found p {
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 2rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .game-info {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .game-title {
    font-size: 2rem;
  }
  
  .game-actions {
    justify-content: center;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .game-header {
    padding: 1rem 0;
  }
  
  .game-title {
    font-size: 1.5rem;
  }
  
  .game-description {
    font-size: 1rem;
  }
  
  .play-button {
    width: 100%;
    justify-content: center;
  }
}
</style>