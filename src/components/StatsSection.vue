<template>
  <section class="stats py-16">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <div class="stat-number" :ref="`stat-${stat.id}`">{{ stat.displayValue }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { GAMES_DATABASE } from '../data/games.js'

export default {
  name: 'StatsSection',
  data() {
    return {
      stats: [
        {
          id: 'games',
          value: GAMES_DATABASE.length,
          displayValue: 0,
          label: 'Amazing Games'
        },
        {
          id: 'players',
          value: 500000,
          displayValue: 0,
          label: 'Happy Players'
        },
        {
          id: 'downloads',
          value: 0,
          displayValue: 0,
          label: 'Downloads Needed'
        },
        {
          id: 'free',
          value: 100,
          displayValue: 0,
          label: '% Free Forever'
        }
      ]
    }
  },
  mounted() {
    this.animateNumbers()
  },
  methods: {
    animateNumbers() {
      this.stats.forEach((stat, index) => {
        setTimeout(() => {
          this.countUp(stat)
        }, index * 200)
      })
    },
    
    countUp(stat) {
      const duration = 2000
      const steps = 60
      const increment = stat.value / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        
        if (stat.id === 'players') {
          stat.displayValue = Math.floor(current / 1000) + 'K+'
        } else if (stat.id === 'free') {
          stat.displayValue = Math.floor(current) + '%'
        } else {
          stat.displayValue = Math.floor(current)
        }
      }, duration / steps)
    }
  }
}
</script>

<style scoped>
.stats {
  background: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
}

.stat-item {
  padding: 2rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: bold;
  color: #6366f1;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #718096;
  font-size: 1.1rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .stat-number {
    font-size: 2.5rem;
  }
  
  .stat-label {
    font-size: 1rem;
  }
}
</style>