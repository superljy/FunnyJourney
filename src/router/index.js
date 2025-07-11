import { createRouter, createWebHistory } from 'vue-router'
import { seoManager } from '../utils/seo.js'
import { analytics } from '../utils/analyticsOptimized.js'
import { resolveLegacyGameUrl, resolveLegacyCategoryUrl } from '../utils/redirects.js'
import { preloadManager } from '../utils/preload.js'

// Lazy load views with intelligent chunking and prefetching
const HomeView = () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
const GameDetailView = () => import(/* webpackChunkName: "game-detail" */ '../views/GameDetailView.vue')
const GamesListView = () => import(/* webpackChunkName: "games-list" */ '../views/GamesListView.vue')
const CategoryView = () => import(/* webpackChunkName: "category" */ '../views/CategoryView.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      title: 'Free Online Games 2025 - Play 500+ Browser Games Instantly',
      description: 'Play 500+ free online games instantly in 2025! No downloads, no registration required. Enjoy card games, puzzles, arcade classics & more. Start playing now!',
      keywords: [
        'free online games 2025',
        'browser games',
        'instant games',
        'no download games',
        'card games online',
        'arcade games free',
        'puzzle games',
        'quick games',
        'office games',
        'stress relief games'
      ]
    }
  },
  {
    path: '/games',
    name: 'GamesList',
    component: GamesListView,
    meta: {
      title: 'All Games - Free Online Games Collection',
      description: 'Browse our complete collection of 500+ free online games. Play instantly without downloads - card games, puzzles, arcade classics, and more!',
      keywords: ['online games collection', 'free browser games', 'game library', 'instant play games']
    }
  },
  {
    path: '/game/:gameId',
    name: 'GameDetail',
    component: GameDetailView,
    props: true,
    meta: {
      requiresGameData: true
    }
  },
  {
    path: '/category/:category',
    name: 'Category',
    component: CategoryView,
    props: true,
    meta: {
      requiresCategoryData: true
    }
  },
  // Legacy redirects for existing HTML pages
  {
    path: '/games/:gameFile.html',
    redirect: (to) => {
      const gameFile = to.params.gameFile + '.html'
      const gameId = resolveLegacyGameUrl(gameFile)
      if (gameId) {
        return `/game/${gameId}`
      }
      // If no game found, redirect to games list
      return '/games'
    }
  },
  // Legacy category redirects
  {
    path: '/category/:categoryFile.html',
    redirect: (to) => {
      const categoryFile = to.params.categoryFile + '.html'
      const category = resolveLegacyCategoryUrl(categoryFile)
      if (category) {
        return `/category/${category}`
      }
      // If no category found, redirect to games list
      return '/games'
    }
  },
  // Legacy games index with hash redirects
  {
    path: '/games/index.html',
    redirect: (to) => {
      const hash = to.hash.replace('#', '')
      if (hash) {
        const category = resolveLegacyCategoryUrl(hash + '.html')
        if (category) {
          return `/category/${category}`
        }
      }
      return '/games'
    }
  },
  // Catch-all route for 404s
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Global navigation guards
router.beforeEach(async (to, from, next) => {
  // Track page navigation
  analytics.trackPageView(to.name || to.path)
  
  // Handle dynamic SEO for game and category pages
  if (to.meta.requiresGameData || to.meta.requiresCategoryData) {
    // Dynamic SEO will be handled in the component
    next()
  } else {
    // Set static SEO meta tags
    if (to.meta.title) {
      seoManager.setPageMeta({
        title: to.meta.title,
        description: to.meta.description,
        keywords: to.meta.keywords
      })
    }
    next()
  }
})

router.afterEach((to, from) => {
  // Set canonical URL after navigation
  seoManager.setCanonicalUrl()
  
  // Track SEO metrics
  seoManager.trackSEOMetrics()
  
  // Update page title in browser
  if (to.meta.title) {
    document.title = to.meta.title
  }
  
  // Intelligent prefetching based on current route
  preloadManager.predictAndPrefetch(to.name)
})

export default router