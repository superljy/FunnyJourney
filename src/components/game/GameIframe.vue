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
        @load="handleFrameLoad"
        @error="handleFrameError"
      ></iframe>
      
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
        <p>Loading {{ game.title }}...</p>
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
      this.$parent.$emit('game-start')
    },
    
    initializeGame() {
      this.loading = true
      this.gameUrl = this.getGameUrl()
    },
    
    getGameUrl() {
      // Convert the existing game.url to iframe-compatible URL
      // For now, use the existing URL structure
      if (this.game.iframeUrl) {
        return this.game.iframeUrl
      }
      
      // Fallback to existing URL structure
      return this.game.url
    },
    
    handleFrameLoad() {
      this.loading = false
      this.$emit('game-loaded')
    },
    
    handleFrameError(error) {
      this.loading = false
      this.$emit('game-error', error)
    }
  }
}
</script>

<style scoped>
.game-iframe-container {
  position: relative;
  width: 100%;
  height: 500px;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.game-iframe-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  border-radius: 0;
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
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #10b981;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 768px) {
  .game-iframe-container {
    height: 400px;
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
    height: 300px;
  }
  
  .play-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
}
</style>