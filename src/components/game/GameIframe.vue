<template>
  <div class="game-iframe-container" :class="{ 'fullscreen': isFullscreen }">
    <div v-if="!isPlaying" class="game-preview">
      <div class="preview-content">
        <img :src="game.image" :alt="game.title" class="preview-image" />
        <div class="preview-overlay">
          <button @click="startGame" class="play-button">
            <span class="play-icon">▶</span>
            <span>Click to Play</span>
          </button>
        </div>
      </div>
    </div>
    
    <div v-else class="game-frame">
      <iframe
        :src="gameUrl"
        :title="game.title"
        frameborder="0"
        allowfullscreen
        scrolling="no"
        allow="gamepad; microphone; camera"
        @load="handleFrameLoad"
        @error="handleFrameError"
      ></iframe>
      
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Loading {{ game.title }}...</p>
      </div>
      
      <div v-if="error" class="error-overlay">
        <div class="error-content">
          <h3>⚠️ Game Loading Error</h3>
          <p>{{ error }}</p>
          <button @click="retryGame" class="retry-button">
            🔄 Retry
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameIframe',
  props: {
    game: {
      type: Object,
      required: true
    },
    isPlaying: {
      type: Boolean,
      default: false
    },
    isFullscreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      error: null,
      gameUrl: ''
    }
  },
  watch: {
    isPlaying(newVal) {
      if (newVal) {
        this.initializeGame()
      }
    }
  },
  methods: {
    startGame() {
      this.$emit('game-start')
    },
    
    initializeGame() {
      this.loading = true
      this.error = null
      this.gameUrl = this.getGameUrl()
      
      // Track game initialization
      if (window.analytics) {
        window.analytics.trackGameStart(this.game.id, this.game.title)
      }
    },
    
    getGameUrl() {
      // Prioritize iframeUrl over url for direct game content
      if (this.game.iframeUrl) {
        // Check if it's already a full URL
        if (this.game.iframeUrl.startsWith('http')) {
          return this.game.iframeUrl
        }
        // Convert relative path to absolute path
        return `/${this.game.iframeUrl.replace(/^\/+/, '')}`
      }
      
      // Fallback to url property
      if (this.game.url) {
        // Check if it's already a full URL
        if (this.game.url.startsWith('http')) {
          return this.game.url
        }
        // Convert relative path to absolute path
        return `/${this.game.url.replace(/^\/+/, '')}`
      }
      
      // Error case
      console.error('No valid game URL found for game:', this.game.id)
      return ''
    },
    
    handleFrameLoad() {
      this.loading = false
      this.error = null
      this.$emit('game-loaded')
      
      // Track successful game load
      if (window.analytics) {
        window.analytics.trackGameLoaded(this.game.id, this.game.title)
      }
    },
    
    handleFrameError(error) {
      this.loading = false
      this.error = `Failed to load ${this.game.title}. Please try again.`
      this.$emit('game-error', error)
      
      // Track game load error
      if (window.analytics) {
        window.analytics.trackGameError(this.game.id, this.game.title, error)
      }
    },
    
    retryGame() {
      this.error = null
      this.initializeGame()
    }
  }
}
</script>

<style scoped>
.game-iframe-container {
  position: relative;
  width: 900px;
  max-width: 90vw;
  height: 650px;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  margin: 2rem auto;
}

.game-iframe-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  border-radius: 0;
  margin: 0;
}

.game-preview {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview-content {
  position: relative;
  width: 100%;
  height: 100%;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
}

.play-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(45deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 1.5rem 3rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
}

.play-button:hover {
  background: linear-gradient(45deg, #059669, #047857);
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(16, 185, 129, 0.6);
}

.play-icon {
  font-size: 1.5rem;
  margin-left: 0.5rem;
}

.game-frame {
  position: relative;
  width: 100%;
  height: 100%;
}

.game-frame iframe {
  width: 100%;
  height: 100%;
  border: none;
  background: #000;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  gap: 1rem;
  z-index: 10;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  z-index: 10;
}

.error-content {
  text-align: center;
  padding: 2rem;
}

.error-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ef4444;
}

.error-content p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #d1d5db;
}

.retry-button {
  background: linear-gradient(45deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: linear-gradient(45deg, #1d4ed8, #1e40af);
  transform: translateY(-2px);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .game-iframe-container {
    width: 95vw;
    height: 400px;
    margin: 1rem auto;
  }
  
  .play-button {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
  
  .play-icon {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .game-iframe-container {
    width: 95vw;
    height: 350px;
    margin: 0.5rem auto;
  }
  
  .play-button {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>