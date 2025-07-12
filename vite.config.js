import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // 放行Vite内部路由
          if (req.url.startsWith('/@vite/') || 
              req.url.startsWith('/@id/') || 
              req.url.startsWith('/@fs/') ||
              req.url.startsWith('/node_modules/') ||
              req.url.startsWith('/__vite_ping') ||
              req.url.includes('?vite') ||
              req.url.includes('?t=') ||
              req.url.includes('?import') ||
              req.url.includes('?v=')) {
            return next()
          }
          
          // 放行游戏HTML文件 - 设置特殊的响应头允许iframe嵌入
          if (req.url.includes('games/') && req.url.endsWith('.html')) {
            res.setHeader('X-Frame-Options', 'SAMEORIGIN')
            res.setHeader('Content-Security-Policy', "frame-ancestors 'self'")
            return next()
          }
          
          // 放行其他静态文件
          if (req.url.includes('.') || req.url.startsWith('/api')) {
            return next()
          }
          
          // 对于SPA路由，返回index-vue.html
          req.url = '/index-vue.html'
          next()
        })
      }
    }
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable sourcemaps in production for security
    minify: 'terser', // Use terser for better compression
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true // Remove debugger statements
      }
    },
    rollupOptions: {
      input: {
        main: 'index-vue.html'
      },
      output: {
        manualChunks(id) {
          // Vue framework chunks
          if (id.includes('vue') || id.includes('@vue')) {
            return 'vue-vendor'
          }
          // Vue Router 
          if (id.includes('vue-router')) {
            return 'vue-router'
          }
          // VueUse utilities
          if (id.includes('@vueuse')) {
            return 'vueuse'
          }
          // Our utilities
          if (id.includes('/src/utils/')) {
            return 'utils'
          }
          // Game components
          if (id.includes('/src/components/game/')) {
            return 'game-components'
          }
          // Views
          if (id.includes('/src/views/')) {
            return 'views'
          }
          // Game data
          if (id.includes('/src/data/games.js')) {
            return 'game-data'
          }
        }
      }
    }
  },
  server: {
    port: 3000,
    open: '/index-vue.html',
    middlewareMode: false,
    headers: {
      // Security headers for development
      'X-Frame-Options': 'SAMEORIGIN', // Allow iframe from same origin
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  },
  preview: {
    port: 3000,
    headers: {
      // Security headers for preview
      'X-Frame-Options': 'SAMEORIGIN', // Allow iframe from same origin
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com; frame-src 'self' https://pagead2.googlesyndication.com;"
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/head']
  },
  define: {
    // Define environment variables for security
    __ENABLE_DEBUG__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  }
})