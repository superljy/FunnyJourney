<template>
  <section class="search-results py-16">
    <div class="container">
      <h2 class="section-title">
        Search Results for "{{ query }}"
      </h2>
      <p class="section-subtitle">
        Found {{ games.length }} game{{ games.length !== 1 ? 's' : '' }}
      </p>
      
      <div v-if="games.length > 0" class="games-grid">
        <GameCard 
          v-for="game in games" 
          :key="game.id" 
          :game="game"
          :show-keywords="true"
        />
      </div>
      
      <div v-else class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No games found</h3>
        <p>Try searching for different keywords or browse our categories below.</p>
        <div class="suggested-keywords">
          <span class="keyword-suggestion" @click="$emit('search', keyword)" 
                v-for="keyword in suggestedKeywords" :key="keyword">
            {{ keyword }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import GameCard from './GameCard.vue'

export default {
  name: 'SearchResults',
  components: {
    GameCard
  },
  props: {
    games: {
      type: Array,
      required: true
    },
    query: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestedKeywords: [
        'puzzle', 'card', 'arcade', 'action', 'racing', 'strategy'
      ]
    }
  }
}
</script>

<style scoped>
.search-results {
  background: white;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.no-results {
  text-align: center;
  padding: 4rem 2rem;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-results h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #4a5568;
}

.no-results p {
  color: #718096;
  margin-bottom: 2rem;
}

.suggested-keywords {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.keyword-suggestion {
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.keyword-suggestion:hover {
  background: #6366f1;
  color: white;
}
</style>