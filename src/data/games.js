// Games Database for FunnyJourney Platform
// Organized with SEO-friendly categories and metadata

export const GAME_CATEGORIES = {
  PUZZLE: 'puzzle',
  ARCADE: 'arcade', 
  CARD: 'card',
  STRATEGY: 'strategy',
  ACTION: 'action',
  CASUAL: 'casual',
  CLICKER: 'clicker',
  RACING: 'racing',
  ADVENTURE: 'adventure'
};

export const GAMES_DATABASE = [
  {
    id: 'monster-survivors',
    title: 'Monster Survivors',
    description: 'Epic monster battles! Upgrade your hero and survive endless waves of enemies in this thrilling action game.',
    category: GAME_CATEGORIES.ACTION,
    image: 'img/Monster-survivors.jpg',
    url: 'games/monster-survivors.html',
    keywords: ['action games', 'survival games', 'monster games', 'hero games'],
    featured: true,
    difficulty: 'medium',
    playTime: '30+ minutes'
  },
  {
    id: 'solitaire',
    title: 'Classic Solitaire',
    description: 'The ultimate card game! Perfect for relaxation and brain training. Play the classic patience card game online.',
    category: GAME_CATEGORIES.CARD,
    image: 'img/solitaire.jpg',
    url: 'games/solitaire.html',
    keywords: ['solitaire online free', 'card games', 'patience game', 'classic solitaire'],
    featured: true,
    difficulty: 'easy',
    playTime: '10-30 minutes'
  },
  {
    id: 'loot-island-treasure-digger',
    title: 'Loot Island - Treasure Digger',
    description: 'Dig for treasure and discover amazing rewards on this mysterious island! Adventure awaits in this exciting digging game.',
    category: GAME_CATEGORIES.ADVENTURE,
    image: 'img/loot-island-treasure-digger.jpg',
    url: 'games/loot-island-treasure-digger.html',
    keywords: ['treasure games', 'digging games', 'adventure games', 'island games'],
    featured: true,
    difficulty: 'easy',
    playTime: '20+ minutes'
  },
  {
    id: 'little-shop',
    title: 'Little Shop',
    description: 'Manage your own shop and serve customers in this fun simulation game! Build your business empire.',
    category: GAME_CATEGORIES.STRATEGY,
    image: 'img/little-shop.jpg',
    url: 'games/little-shop.html',
    keywords: ['shop games', 'business games', 'simulation games', 'management games'],
    featured: false,
    difficulty: 'medium',
    playTime: '30+ minutes'
  },
  {
    id: 'rolling-balls-space-race',
    title: 'Rolling Balls Space Race',
    description: 'Race through space with rolling balls in this exciting arcade game! Navigate cosmic obstacles and compete for the best time.',
    category: GAME_CATEGORIES.RACING,
    image: 'img/rolling-balls-space-race.jpg',
    url: 'games/rolling-balls-space-race.html',
    keywords: ['racing games', 'space games', 'ball games', 'arcade games'],
    featured: false,
    difficulty: 'medium',
    playTime: '15-30 minutes'
  },
  {
    id: 'love-tester',
    title: 'Love Tester',
    description: 'Test your compatibility and find your perfect match! Fun relationship testing game for entertainment.',
    category: GAME_CATEGORIES.CASUAL,
    image: 'img/love-tester.jpg',
    url: 'games/love-tester.html',
    keywords: ['love games', 'relationship games', 'fun games', 'personality games'],
    featured: false,
    difficulty: 'easy',
    playTime: '5-10 minutes'
  },
  {
    id: 'highway-traffic',
    title: 'Highway Traffic',
    description: 'Navigate through busy highway traffic in this thrilling driving game! Avoid collisions and reach your destination.',
    category: GAME_CATEGORIES.RACING,
    image: 'img/highway-traffic.jpg',
    url: 'games/highway-traffic.html',
    keywords: ['traffic games', 'driving games', 'highway games', 'car games'],
    featured: false,
    difficulty: 'medium',
    playTime: '10-25 minutes'
  },
  {
    id: 'stack-fire-ball',
    title: 'Stack Fire Ball',
    description: 'Stack and smash through colorful platforms in this addictive game! Break through obstacles with precision timing.',
    category: GAME_CATEGORIES.ARCADE,
    image: 'img/stack-fire-ball.jpg',
    url: 'games/stack-fire-ball.html',
    keywords: ['ball games', 'stacking games', 'arcade games', 'skill games'],
    featured: false,
    difficulty: 'medium',
    playTime: '15-30 minutes'
  },
  {
    id: 'apocalypse-truck',
    title: 'Apocalypse Truck',
    description: 'Drive through the apocalypse and survive the zombie invasion! Epic post-apocalyptic driving adventure.',
    category: GAME_CATEGORIES.ACTION,
    image: 'img/apocalypse-truck.jpg',
    url: 'games/apocalypse-truck.html',
    keywords: ['apocalypse games', 'zombie games', 'truck games', 'survival games'],
    featured: false,
    difficulty: 'hard',
    playTime: '20+ minutes'
  },
  {
    id: 'egg-helix',
    title: 'Egg Helix',
    description: 'Guide the egg through the helix tower in this challenging arcade game! Master the timing and reflexes.',
    category: GAME_CATEGORIES.ARCADE,
    image: 'img/Egg-Helix.jpg',
    url: 'games/egg-helix.html',
    keywords: ['helix games', 'egg games', 'arcade games', 'skill games'],
    featured: false,
    difficulty: 'medium',
    playTime: '10-20 minutes'
  },
  {
    id: 'diamant-match-3-sky-story',
    title: 'Diamant Match 3 Sky Story',
    description: 'Match sparkling diamonds in this magical sky adventure! Beautiful match-3 puzzle game with stunning graphics.',
    category: GAME_CATEGORIES.PUZZLE,
    image: 'img/diamant-match-3-sky-story.jpg',
    url: 'games/diamant-match-3-sky-story.html',
    keywords: ['match 3 games', 'diamond games', 'puzzle games', 'sky games'],
    featured: true,
    difficulty: 'easy',
    playTime: '15-45 minutes'
  },
  {
    id: 'grass-land-cei',
    title: 'Grass Land CEI',
    description: 'Explore beautiful grass lands in this exciting nature adventure! Discover secrets in this peaceful exploration game.',
    category: GAME_CATEGORIES.ADVENTURE,
    image: 'img/grass-land-cei.jpg',
    url: 'games/grass-land-cei.html',
    keywords: ['nature games', 'exploration games', 'adventure games', 'grass games'],
    featured: false,
    difficulty: 'easy',
    playTime: '20-40 minutes'
  },
  {
    id: 'paper-boy-race-running-game',
    title: 'Paper Boy Race Running Game',
    description: 'Race through streets as a paper boy delivering newspapers! Fast-paced running game with nostalgic charm.',
    category: GAME_CATEGORIES.RACING,
    image: 'img/paper-boy-race-running-game.jpg',
    url: 'games/paper-boy-race-running-game.html',
    keywords: ['running games', 'paper boy games', 'delivery games', 'race games'],
    featured: false,
    difficulty: 'medium',
    playTime: '10-25 minutes'
  },
  {
    id: 'leap-and-avoid-2',
    title: 'Leap and Avoid 2',
    description: 'Master the art of leaping and avoiding in this thrilling sequel! Enhanced gameplay with new challenges.',
    category: GAME_CATEGORIES.ARCADE,
    image: 'img/leap-and-avoid-2.jpg',
    url: 'games/leap-and-avoid-2.html',
    keywords: ['jumping games', 'avoiding games', 'arcade games', 'skill games'],
    featured: false,
    difficulty: 'hard',
    playTime: '15-30 minutes'
  },
  {
    id: 'color-music-hop-ball-games',
    title: 'Color Music Hop Ball Games',
    description: 'Hop to the beat in this colorful music adventure! Rhythm-based gameplay with vibrant visuals.',
    category: GAME_CATEGORIES.ARCADE,
    image: 'img/color-music-hop-ball-games.jpg',
    url: 'games/color-music-hop-ball-games.html',
    keywords: ['music games', 'rhythm games', 'ball games', 'color games'],
    featured: false,
    difficulty: 'medium',
    playTime: '10-30 minutes'
  },
  {
    id: 'cookie-clicker-pro',
    title: 'Cookie Clicker Pro',
    description: 'Click your way to cookie empire domination in this addictive idle clicker! Build the ultimate cookie factory.',
    category: GAME_CATEGORIES.CLICKER,
    image: 'img/Cookie-Clicker-Pro-Game.jpg',
    url: 'games/cookie-clicker-pro.html',
    keywords: ['cookie clicker', 'idle games', 'clicker games', 'incremental games'],
    featured: true,
    difficulty: 'easy',
    playTime: '30+ minutes'
  },
  {
    id: 'capybara-clicker-pro',
    title: 'Capybara Clicker Pro',
    description: 'Click adorable capybaras and build the cutest animal empire ever! Relaxing clicker game with cute animals.',
    category: GAME_CATEGORIES.CLICKER,
    image: 'img/Capybara-Clicker-Pro.jpg',
    url: 'games/capybara-clicker-pro.html',
    keywords: ['capybara games', 'animal games', 'clicker games', 'cute games'],
    featured: true,
    difficulty: 'easy',
    playTime: '20+ minutes'
  },
  {
    id: 'poop-clicker',
    title: 'Poop Clicker',
    description: 'The most hilariously absurd clicker game you\'ll ever play! Funny and entertaining clicking adventure.',
    category: GAME_CATEGORIES.CLICKER,
    image: 'img/Poop-Clicker.jpg',
    url: 'games/poop-clicker.html',
    keywords: ['funny games', 'clicker games', 'humor games', 'silly games'],
    featured: false,
    difficulty: 'easy',
    playTime: '15-45 minutes'
  },
  {
    id: 'highway-cars',
    title: 'Highway Cars',
    description: 'Race through endless highway traffic at breakneck speeds! High-speed racing with challenging obstacles.',
    category: GAME_CATEGORIES.RACING,
    image: 'img/Highway-Cars.jpg',
    url: 'games/highway-cars.html',
    keywords: ['car games', 'highway games', 'racing games', 'speed games'],
    featured: false,
    difficulty: 'medium',
    playTime: '10-30 minutes'
  },
  {
    id: 'secret-galaxy-match-three',
    title: 'Secret Galaxy Match Three',
    description: 'Embark on a cosmic puzzle adventure through the secret galaxy! Match gems among the stars.',
    category: GAME_CATEGORIES.PUZZLE,
    image: 'img/Block Crasher.jpg',
    url: 'games/secret-galaxy-match-three.html',
    keywords: ['galaxy games', 'match 3 games', 'space games', 'puzzle games'],
    featured: false,
    difficulty: 'medium',
    playTime: '20-45 minutes'
  },
  {
    id: 'happy-blocks',
    title: 'Happy Blocks',
    description: 'Colorful block puzzle fun with cheerful graphics and addictive gameplay! Perfect for all ages.',
    category: GAME_CATEGORIES.PUZZLE,
    image: 'img/Happy Blocks.jpg',
    url: 'games/happy-blocks.html',
    keywords: ['block games', 'puzzle games', 'happy games', 'colorful games'],
    featured: false,
    difficulty: 'easy',
    playTime: '15-40 minutes'
  }
];

// Helper functions for game management
export const gameUtils = {
  // Get games by category
  getGamesByCategory(category) {
    return GAMES_DATABASE.filter(game => game.category === category);
  },

  // Get featured games
  getFeaturedGames() {
    return GAMES_DATABASE.filter(game => game.featured);
  },

  // Get random games
  getRandomGames(count = 6) {
    const shuffled = [...GAMES_DATABASE].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },

  // Search games
  searchGames(query) {
    const searchTerm = query.toLowerCase();
    return GAMES_DATABASE.filter(game => 
      game.title.toLowerCase().includes(searchTerm) ||
      game.description.toLowerCase().includes(searchTerm) ||
      game.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );
  },

  // Get game by ID
  getGameById(id) {
    return GAMES_DATABASE.find(game => game.id === id);
  },

  // Get all categories
  getAllCategories() {
    return Object.values(GAME_CATEGORIES);
  },

  // Get games count by category
  getCategoryStats() {
    const stats = {};
    Object.values(GAME_CATEGORIES).forEach(category => {
      stats[category] = this.getGamesByCategory(category).length;
    });
    return stats;
  }
};

export default GAMES_DATABASE;