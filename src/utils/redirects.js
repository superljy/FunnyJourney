// Legacy URL redirection utilities
// Maps old HTML file paths to new game IDs

import { gameUtils } from '../data/games.js'

// URL mapping for legacy game pages
export const LEGACY_URL_MAPPING = {
  // Direct filename to game ID mappings
  'monster-survivors.html': 'monster-survivors',
  'solitaire.html': 'solitaire',
  'loot-island-treasure-digger.html': 'loot-island-treasure-digger',
  'little-shop.html': 'little-shop',
  'rolling-balls-space-race.html': 'rolling-balls-space-race',
  'love-tester.html': 'love-tester',
  'highway-traffic.html': 'highway-traffic',
  'stack-fire-ball.html': 'stack-fire-ball',
  'apocalypse-truck.html': 'apocalypse-truck',
  'egg-helix.html': 'egg-helix',
  'diamant-match-3-sky-story.html': 'diamant-match-3-sky-story',
  'grass-land-cei.html': 'grass-land-cei',
  'paper-boy-race-running-game.html': 'paper-boy-race-running-game',
  'leap-and-avoid-2.html': 'leap-and-avoid-2',
  'color-music-hop-ball-games.html': 'color-music-hop-ball-games',
  'cookie-clicker-pro.html': 'cookie-clicker-pro',
  'capybara-clicker-pro.html': 'capybara-clicker-pro',
  'poop-clicker.html': 'poop-clicker',
  'highway-cars.html': 'highway-cars',
  'secret-galaxy-match-three.html': 'secret-galaxy-match-three',
  'happy-blocks.html': 'happy-blocks'
}

// Legacy category URLs
export const LEGACY_CATEGORY_MAPPING = {
  'puzzle.html': 'puzzle',
  'arcade.html': 'arcade',
  'card.html': 'card',
  'strategy.html': 'strategy',
  'action.html': 'action',
  'casual.html': 'casual',
  'clicker.html': 'clicker',
  'racing.html': 'racing',
  'adventure.html': 'adventure'
}

/**
 * Resolve legacy game URL to new game ID
 * @param {string} fileName - The legacy filename (e.g., 'monster-survivors.html')
 * @returns {string|null} - The corresponding game ID or null if not found
 */
export function resolveLegacyGameUrl(fileName) {
  // First check direct mapping
  if (LEGACY_URL_MAPPING[fileName]) {
    return LEGACY_URL_MAPPING[fileName]
  }
  
  // Fallback: try to match by removing .html extension
  const gameId = fileName.replace('.html', '')
  
  // Verify the game exists in the database
  const game = gameUtils.getGameById(gameId)
  if (game) {
    return gameId
  }
  
  // If no match found, return null
  return null
}

/**
 * Resolve legacy category URL to new category name
 * @param {string} fileName - The legacy category filename
 * @returns {string|null} - The corresponding category name or null if not found
 */
export function resolveLegacyCategoryUrl(fileName) {
  return LEGACY_CATEGORY_MAPPING[fileName] || null
}

/**
 * Generate redirect URL for legacy paths
 * @param {string} legacyPath - The full legacy path
 * @returns {string|null} - The new URL path or null if no redirect needed
 */
export function generateRedirectUrl(legacyPath) {
  // Extract filename from path
  const fileName = legacyPath.split('/').pop()
  
  // Handle game redirects
  if (fileName.endsWith('.html')) {
    const gameId = resolveLegacyGameUrl(fileName)
    if (gameId) {
      return `/game/${gameId}`
    }
    
    const category = resolveLegacyCategoryUrl(fileName)
    if (category) {
      return `/category/${category}`
    }
  }
  
  // Handle other legacy patterns
  if (legacyPath.includes('/games/') && legacyPath.includes('#')) {
    // Handle old category anchor links like /games/index.html#puzzle
    const anchor = legacyPath.split('#')[1]
    if (anchor && LEGACY_CATEGORY_MAPPING[anchor + '.html']) {
      return `/category/${anchor}`
    }
  }
  
  return null
}

/**
 * Check if a URL needs redirection
 * @param {string} path - The current path
 * @returns {boolean} - True if redirection is needed
 */
export function needsRedirection(path) {
  return generateRedirectUrl(path) !== null
}

export default {
  LEGACY_URL_MAPPING,
  LEGACY_CATEGORY_MAPPING,
  resolveLegacyGameUrl,
  resolveLegacyCategoryUrl,
  generateRedirectUrl,
  needsRedirection
}