<template>
  <section class="category-results py-16">
    <div class="container">
      <h2 class="section-title">
        {{ formatCategory(category) }} Games
      </h2>
      <p class="section-subtitle">
        Discover {{ games.length }} amazing {{ category }} games - all free to play!
      </p>
      
      <div class="games-grid">
        <GameCard 
          v-for="game in games" 
          :key="game.id" 
          :game="game"
        />
      </div>
    </div>
  </section>
</template>

<script>
import GameCard from './GameCard.vue'

export default {
  name: 'CategoryResults',
  components: {
    GameCard
  },
  props: {
    games: {
      type: Array,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  methods: {
    formatCategory(category) {
      return category.charAt(0).toUpperCase() + category.slice(1)
    }
  }
}
</script>

<style scoped>
.category-results {
  background: #f8fafc;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
</style>