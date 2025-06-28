<template>
  <section id="games" class="games-section py-20">
    <div class="container">
      <h2 class="section-title">{{ title }}</h2>
      
      <div class="games-grid">
        <GameCard 
          v-for="game in games" 
          :key="game.id" 
          :game="game"
          :lazy="true"
        />
      </div>
      
      <div v-if="showAllLink" class="view-all-container">
        <a href="games/index.html" class="btn btn-primary">
          View All Games
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import GameCard from './GameCard.vue'

export default {
  name: 'GamesSection',
  components: {
    GameCard
  },
  props: {
    title: {
      type: String,
      required: true
    },
    games: {
      type: Array,
      required: true
    },
    showAllLink: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.games-section {
  background: #f8fafc;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.view-all-container {
  text-align: center;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .games-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>