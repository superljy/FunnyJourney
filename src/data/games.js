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
    image: '/img/Monster-survivors.jpg',
    url: 'games/monster-survivors.html',
    iframeUrl: 'https://cloud.onlinegames.io/games/2025/unity/monster-survivors/index-og.html',
    keywords: ['action games', 'survival games', 'monster games', 'hero games'],
    featured: true,
    difficulty: 'medium',
    playTime: '30+ minutes',
    instructions: [
      'Use arrow keys or WASD to move your character',
      'Click or spacebar to attack monsters',
      'Collect experience orbs to level up',
      'Choose upgrades wisely to survive longer waves',
      'Avoid getting surrounded by enemies'
    ],
    features: [
      'Progressive difficulty system',
      'Multiple character upgrades',
      'Endless wave survival',
      'Experience-based progression',
      'Dynamic monster spawning'
    ],
    tips: [
      'Focus on movement speed early in the game',
      'Try to fight monsters near the edges of the screen',
      'Prioritize weapons that can hit multiple enemies',
      'Keep moving - standing still is dangerous',
      'Balance offense and defense upgrades'
    ],
    seoMeta: {
      title: 'Monster Survivors - Epic Action Survival Game Online Free',
      description: 'Play Monster Survivors free online! Epic action survival game with endless waves, character upgrades, and intense monster battles. Start playing now!',
      keywords: ['monster survivors game', 'survival action game', 'endless wave game', 'hero upgrade game']
    }
  },
  {
    id: 'solitaire',
    title: 'Classic Solitaire',
    description: 'The ultimate card game! Perfect for relaxation and brain training. Play the classic patience card game online.',
    category: GAME_CATEGORIES.CARD,
    image: '/img/solitaire.jpg',
    url: 'games/solitaire.html',
    iframeUrl: 'https://cloud.onlinegames.io/games/2025/html/solitaire/index-og.html',
    keywords: ['solitaire online free', 'card games', 'patience game', 'classic solitaire'],
    featured: true,
    difficulty: 'easy',
    playTime: '10-30 minutes',
    instructions: [
      'Click and drag cards to move them',
      'Build sequences from King to Ace in alternating colors',
      'Move cards to foundation piles starting with Ace',
      'Click the deck to reveal new cards',
      'Use the waste pile strategically'
    ],
    features: [
      'Classic Klondike Solitaire rules',
      'Smooth drag and drop interface',
      'Auto-complete when possible',
      'Unlimited undo functionality',
      'Score tracking system'
    ],
    tips: [
      'Always move Aces to foundations first',
      'Try to expose hidden cards as priority',
      'Keep foundation piles balanced when possible',
      'Use empty tableau spaces strategically',
      'Think ahead before making moves'
    ],
    seoMeta: {
      title: 'Classic Solitaire - Free Online Card Game | Play Now',
      description: 'Play Classic Solitaire free online! The ultimate patience card game for relaxation and brain training. No download required - start playing instantly!',
      keywords: ['free solitaire online', 'classic solitaire game', 'patience card game', 'klondike solitaire']
    }
  },
  {
    id: 'loot-island-treasure-digger',
    title: 'Loot Island - Treasure Digger',
    description: 'Dig for treasure and discover amazing rewards on this mysterious island! Adventure awaits in this exciting digging game.',
    category: GAME_CATEGORIES.ADVENTURE,
    image: '/img/loot-island-treasure-digger.jpg',
    url: 'games/loot-island-treasure-digger.html',
    iframeUrl: 'https://www.crazygames.com/embed/loot-island---treasure-digger',
    keywords: ['treasure games', 'digging games', 'adventure games', 'island games'],
    featured: true,
    difficulty: 'easy',
    playTime: '20+ minutes',
    instructions: [
      'Click and drag to dig in different locations',
      'Watch for sparkling areas that indicate treasure',
      'Collect coins and gems as you discover them',
      'Upgrade your digging tools for better rewards',
      'Explore different areas of the island'
    ],
    features: [
      'Mysterious treasure-filled island to explore',
      'Progressive tool upgrades and improvements',
      'Hidden treasures and rare gem discoveries',
      'Beautiful island graphics and animations',
      'Rewarding progression system'
    ],
    tips: [
      'Start digging near rock formations and cliffs',
      'Save coins to buy better digging equipment',
      'Look for visual clues like unusual ground patterns',
      'Dig systematically to cover more ground',
      'Don\'t miss small sparkles - they often lead to big finds'
    ],
    seoMeta: {
      title: 'Loot Island Treasure Digger - Free Adventure Digging Game',
      description: 'Dig for treasure on mysterious Loot Island! Free adventure game with hidden treasures, tool upgrades, and exciting discoveries. Play now!',
      keywords: ['treasure digging game', 'island adventure game', 'treasure hunting online', 'free digging game']
    }
  },
  {
    id: 'little-shop',
    title: 'Little Shop',
    description: 'Manage your own shop and serve customers in this fun simulation game! Build your business empire.',
    category: GAME_CATEGORIES.STRATEGY,
    image: '/img/little-shop.jpg',
    url: 'games/little-shop.html',
    iframeUrl: 'https://www.crazygames.com/embed/little-shop',
    keywords: ['shop games', 'business games', 'simulation games', 'management games'],
    featured: false,
    difficulty: 'medium',
    playTime: '30+ minutes',
    instructions: [
      'Click on customers to serve them quickly',
      'Drag items from shelves to the counter',
      'Manage your inventory and restock regularly',
      'Handle multiple customers efficiently',
      'Upgrade your shop with earned profits'
    ],
    features: [
      'Realistic shop management simulation',
      'Multiple product categories to manage',
      'Customer satisfaction system',
      'Shop upgrade and expansion options',
      'Progressive difficulty and challenges'
    ],
    tips: [
      'Prioritize fast-moving customers to maximize tips',
      'Keep popular items well-stocked',
      'Upgrade your cash register for faster transactions',
      'Watch customer mood indicators',
      'Plan your shop layout for maximum efficiency'
    ],
    seoMeta: {
      title: 'Little Shop - Free Business Management Simulation Game',
      description: 'Manage your own Little Shop! Fun business simulation game with customer service, inventory management, and shop upgrades. Play free online!',
      keywords: ['business management game', 'shop simulation game', 'customer service game', 'retail management game']
    }
  },
  {
    id: 'rolling-balls-space-race',
    title: 'Rolling Balls Space Race',
    description: 'Race through space with rolling balls in this exciting arcade game! Navigate cosmic obstacles and compete for the best time.',
    category: GAME_CATEGORIES.RACING,
    image: '/img/rolling-balls-space-race.jpg',
    url: 'games/rolling-balls-space-race.html',
    iframeUrl: 'https://www.crazygames.com/embed/rolling-balls-space-race',
    keywords: ['racing games', 'space games', 'ball games', 'arcade games'],
    featured: false,
    difficulty: 'medium',
    playTime: '15-30 minutes',
    instructions: [
      'Use arrow keys or tilt controls to guide the ball',
      'Avoid obstacles and cosmic debris',
      'Collect power-ups and speed boosters',
      'Navigate through checkpoint gates',
      'Maintain momentum for best racing times'
    ],
    features: [
      'Stunning space environments and graphics',
      'Physics-based ball rolling mechanics',
      'Multiple challenging race tracks',
      'Power-ups and speed boost system',
      'Time trial and leaderboard competition'
    ],
    tips: [
      'Use gentle movements for better control',
      'Plan your path through tight spaces',
      'Collect all speed boosts for faster times',
      'Practice the track layout to improve',
      'Use momentum to navigate difficult sections'
    ],
    seoMeta: {
      title: 'Rolling Balls Space Race - Free 3D Racing Game Online',
      description: 'Race rolling balls through space! Exciting 3D racing game with cosmic obstacles, power-ups, and time challenges. Play free online now!',
      keywords: ['ball racing game', 'space racing game', '3d ball game', 'rolling ball race']
    }
  },
  {
    id: 'love-tester',
    title: 'Love Tester',
    description: 'Test your compatibility and find your perfect match! Fun relationship testing game for entertainment.',
    category: GAME_CATEGORIES.CASUAL,
    image: '/img/love-tester.jpg',
    url: 'games/love-tester.html',
    iframeUrl: 'https://www.onlinegames.io/games/2021/3/love-tester/index.html',
    keywords: ['love games', 'relationship games', 'fun games', 'personality games'],
    featured: false,
    difficulty: 'easy',
    playTime: '5-10 minutes',
    instructions: [
      'Enter your name and your crush\'s name',
      'Click the heart button to start the test',
      'Watch the compatibility percentage appear',
      'Try different name combinations',
      'Share your results with friends'
    ],
    features: [
      'Fun compatibility calculator algorithm',
      'Instant percentage-based results',
      'Colorful heart-themed interface',
      'Entertaining relationship predictions',
      'Quick and easy to use'
    ],
    tips: [
      'Try variations of names for different results',
      'Remember this is just for fun entertainment',
      'Test multiple combinations to see patterns',
      'Share funny results with friends',
      'Don\'t take the results too seriously'
    ],
    seoMeta: {
      title: 'Love Tester - Free Compatibility Calculator Game Online',
      description: 'Test your love compatibility! Fun relationship calculator game that predicts your romantic match percentage. Play free online now!',
      keywords: ['love compatibility test', 'relationship calculator', 'love percentage game', 'compatibility checker']
    }
  },
  {
    id: 'highway-traffic',
    title: 'Highway Traffic',
    description: 'Navigate through busy highway traffic in this thrilling driving game! Avoid collisions and reach your destination.',
    category: GAME_CATEGORIES.RACING,
    image: '/img/highway-traffic.jpg',
    url: 'games/highway-traffic.html',
    iframeUrl: 'https://www.onlinegames.io/games/2022/unity/highway-traffic/index.html',
    keywords: ['traffic games', 'driving games', 'highway games', 'car games'],
    featured: false,
    difficulty: 'medium',
    playTime: '10-25 minutes',
    instructions: [
      'Use arrow keys or WASD to steer your car',
      'Avoid collisions with other vehicles',
      'Change lanes carefully to overtake',
      'Watch for speed limits and traffic signs',
      'Reach checkpoints within time limits'
    ],
    features: [
      'Realistic highway driving simulation',
      'Dynamic traffic patterns and AI cars',
      'Multiple lanes and highway scenarios',
      'Speed and distance tracking system',
      'Challenging traffic density levels'
    ],
    tips: [
      'Maintain safe following distances',
      'Use indicators when changing lanes',
      'Plan your overtaking maneuvers ahead',
      'Keep an eye on your speedometer',
      'Stay calm in heavy traffic situations'
    ],
    seoMeta: {
      title: 'Highway Traffic - Free Driving Simulation Game Online',
      description: 'Navigate highway traffic in this realistic driving game! Test your skills avoiding collisions and reaching destinations. Play free online!',
      keywords: ['highway driving game', 'traffic simulation game', 'car driving game', 'highway racing game']
    }
  },
  {
    id: 'stack-fire-ball',
    title: 'Stack Fire Ball',
    description: 'Stack and smash through colorful platforms in this addictive game! Break through obstacles with precision timing.',
    category: GAME_CATEGORIES.ARCADE,
    image: '/img/stack-fire-ball.jpg',
    url: 'games/stack-fire-ball.html',
    iframeUrl: 'https://www.onlinegames.io/games/2021/unity/stack-fire-ball/index.html',
    keywords: ['ball games', 'stacking games', 'arcade games', 'skill games'],
    featured: false,
    difficulty: 'medium',
    playTime: '15-30 minutes',
    instructions: [
      'Hold and release to drop the ball through platforms',
      'Break through colored platforms but avoid black ones',
      'Use momentum to smash through multiple levels',
      'Time your drops carefully for maximum effect',
      'Collect power-ups to enhance your ball abilities'
    ],
    features: [
      'Satisfying platform-breaking physics',
      'Colorful visual effects and animations',
      'Progressive difficulty levels',
      'Power-up system for enhanced gameplay',
      'Addictive one-tap control mechanism'
    ],
    tips: [
      'Look for chains of breakable platforms',
      'Build up speed before hitting tough sections',
      'Avoid black platforms at all costs',
      'Use the edges of platforms for better angles',
      'Practice timing to maintain momentum'
    ],
    seoMeta: {
      title: 'Stack Fire Ball - Free Arcade Ball Breaking Game Online',
      description: 'Smash through colorful platforms in Stack Fire Ball! Addictive arcade game with physics-based ball breaking action. Play free online now!',
      keywords: ['ball breaking game', 'platform smashing game', 'arcade ball game', 'stack breaking game']
    }
  },
  {
    id: 'apocalypse-truck',
    title: 'Apocalypse Truck',
    description: 'Drive through the apocalypse and survive the zombie invasion! Epic post-apocalyptic driving adventure.',
    category: GAME_CATEGORIES.ACTION,
    image: '/img/apocalypse-truck.jpg',
    url: 'games/apocalypse-truck.html',
    iframeUrl: 'https://cloud.onlinegames.io/games/2021/1/apocalypse-truck/index-og.html',
    keywords: ['apocalypse games', 'zombie games', 'truck games', 'survival games'],
    featured: false,
    difficulty: 'hard',
    playTime: '20+ minutes',
    instructions: [
      'Use arrow keys or WASD to control the truck',
      'Ram through zombie hordes and obstacles',
      'Collect fuel and ammunition along the way',
      'Upgrade your truck with better armor and weapons',
      'Survive as long as possible in the wasteland'
    ],
    features: [
      'Post-apocalyptic wasteland environments',
      'Intense zombie survival action',
      'Truck customization and upgrade system',
      'Weapon attachments and defensive gear',
      'Challenging survival gameplay mechanics'
    ],
    tips: [
      'Prioritize fuel collection to avoid getting stranded',
      'Use ramming attacks to conserve ammunition',
      'Upgrade armor before offensive capabilities',
      'Look for supply caches in abandoned buildings',
      'Maintain speed to avoid being overwhelmed'
    ],
    seoMeta: {
      title: 'Apocalypse Truck - Free Zombie Survival Driving Game',
      description: 'Survive the zombie apocalypse in your truck! Epic post-apocalyptic driving game with upgrades, weapons, and intense survival action. Play free!',
      keywords: ['zombie truck game', 'apocalypse survival game', 'post-apocalyptic driving', 'zombie survival game']
    }
  },
  {
    id: 'egg-helix',
    title: 'Egg Helix',
    description: 'Guide the egg through the helix tower in this challenging arcade game! Master the timing and reflexes.',
    category: GAME_CATEGORIES.ARCADE,
    image: '/img/Egg-Helix.jpg',
    url: 'games/egg-helix.html',
    iframeUrl: 'https://www.onlinegames.io/games/2022/unity2/egg-helix/index.html',
    keywords: ['helix games', 'egg games', 'arcade games', 'skill games'],
    featured: false,
    difficulty: 'medium',
    playTime: '10-20 minutes',
    instructions: [
      'Tap and hold to make the egg fall through gaps',
      'Rotate the helix tower to find safe passages',
      'Avoid colored sections that will break your egg',
      'Build up speed by consecutive successful drops',
      'Aim for the center of gaps for smoother passage'
    ],
    features: [
      'Satisfying helix tower mechanics',
      'Smooth egg physics and animations',
      'Progressive difficulty with faster speeds',
      'Colorful and engaging visual design',
      'Addictive one-touch gameplay'
    ],
    tips: [
      'Practice timing your drops for better control',
      'Don\'t rush - wait for the right moment',
      'Use the tower rotation to your advantage',
      'Build momentum for faster progression',
      'Focus on the gaps rather than the obstacles'
    ],
    seoMeta: {
      title: 'Egg Helix - Free Arcade Tower Falling Game Online',
      description: 'Guide the egg through the helix tower! Challenging arcade game with timing-based gameplay and smooth physics. Play free online now!',
      keywords: ['helix tower game', 'egg falling game', 'arcade timing game', 'helix puzzle game']
    }
  },
  {
    id: 'diamant-match-3-sky-story',
    title: 'Diamant Match 3 Sky Story',
    description: 'Match sparkling diamonds in this magical sky adventure! Beautiful match-3 puzzle game with stunning graphics.',
    category: GAME_CATEGORIES.PUZZLE,
    image: '/img/diamant-match-3-sky-story.jpg',
    url: 'games/diamant-match-3-sky-story.html',
    iframeUrl: 'https://www.crazygames.com/embed/diamant-match-3-sky-story',
    keywords: ['match 3 games', 'diamond games', 'puzzle games', 'sky games'],
    featured: true,
    difficulty: 'easy',
    playTime: '15-45 minutes',
    instructions: [
      'Match 3 or more identical diamonds to clear them',
      'Swap adjacent diamonds to create matches',
      'Complete level objectives within move limits',
      'Create special combos for bonus points',
      'Use power-ups strategically to clear difficult levels'
    ],
    features: [
      'Beautiful sky-themed graphics and animations',
      'Hundreds of challenging puzzle levels',
      'Special diamond power-ups and combos',
      'Progressive difficulty with unique objectives',
      'Magical soundtrack and sound effects'
    ],
    tips: [
      'Look for opportunities to create special diamonds',
      'Plan moves ahead to maximize efficiency',
      'Focus on completing objectives first',
      'Save power-ups for the most difficult sections',
      'Create cascading matches for bonus points'
    ],
    seoMeta: {
      title: 'Diamant Match 3 Sky Story - Free Puzzle Game Online',
      description: 'Match sparkling diamonds in this magical sky adventure! Beautiful match-3 puzzle game with stunning graphics and hundreds of levels. Play free!',
      keywords: ['diamond match 3 game', 'sky puzzle game', 'jewel matching game', 'magical match 3']
    }
  },
  {
    id: 'grass-land-cei',
    title: 'Grass Land CEI',
    description: 'Explore beautiful grass lands in this exciting nature adventure! Discover secrets in this peaceful exploration game.',
    category: GAME_CATEGORIES.ADVENTURE,
    image: '/img/grass-land-cei.jpg',
    url: 'games/grass-land-cei.html',
    iframeUrl: 'https://www.crazygames.com/embed/grass-land-cei',
    keywords: ['nature games', 'exploration games', 'adventure games', 'grass games'],
    featured: false,
    difficulty: 'easy',
    playTime: '20-40 minutes',
    instructions: [
      'Use arrow keys or WASD to explore the grasslands',
      'Interact with objects by clicking or pressing spacebar',
      'Collect items and clues scattered throughout the area',
      'Talk to characters to learn about hidden secrets',
      'Solve environmental puzzles to progress'
    ],
    features: [
      'Peaceful and relaxing grassland environments',
      'Hidden secrets and collectible items',
      'Charming characters and storylines',
      'Beautiful nature-inspired artwork',
      'Calming soundtrack and ambient sounds'
    ],
    tips: [
      'Take your time to explore every corner',
      'Look for unusual objects or color variations',
      'Talk to all characters for important clues',
      'Keep track of items you\'ve collected',
      'Enjoy the peaceful atmosphere and don\'t rush'
    ],
    seoMeta: {
      title: 'Grass Land CEI - Free Nature Adventure Exploration Game',
      description: 'Explore beautiful grasslands in this peaceful adventure! Nature exploration game with hidden secrets and charming characters. Play free online!',
      keywords: ['nature exploration game', 'grassland adventure', 'peaceful exploration game', 'nature discovery game']
    }
  },
  {
    id: 'paper-boy-race-running-game',
    title: 'Paper Boy Race Running Game',
    description: 'Race through streets as a paper boy delivering newspapers! Fast-paced running game with nostalgic charm.',
    category: GAME_CATEGORIES.RACING,
    image: '/img/paper-boy-race-running-game.jpg',
    url: 'games/paper-boy-race-running-game.html',
    iframeUrl: 'https://www.crazygames.com/embed/paper-boy-race-running-game',
    keywords: ['running games', 'paper boy games', 'delivery games', 'race games'],
    featured: false,
    difficulty: 'medium',
    playTime: '10-25 minutes',
    instructions: [
      'Use arrow keys or WASD to control the paper boy',
      'Throw newspapers at targeted houses and mailboxes',
      'Avoid obstacles like cars, dogs, and pedestrians',
      'Collect bonuses and power-ups along the route',
      'Complete delivery quotas within time limits'
    ],
    features: [
      'Nostalgic paper boy delivery gameplay',
      'Multiple neighborhood environments',
      'Various obstacles and challenges',
      'Scoring system based on delivery accuracy',
      'Retro-style graphics and soundtrack'
    ],
    tips: [
      'Aim ahead of moving targets for better accuracy',
      'Learn the timing for each type of obstacle',
      'Prioritize houses with higher point values',
      'Use power-ups at the right moment',
      'Practice your throwing technique for consistency'
    ],
    seoMeta: {
      title: 'Paper Boy Race Running Game - Free Delivery Game Online',
      description: 'Race through streets as a paper boy delivering newspapers! Nostalgic running game with delivery challenges and retro charm. Play free online!',
      keywords: ['paper boy game', 'newspaper delivery game', 'running delivery game', 'retro paper boy']
    }
  },
  {
    id: 'leap-and-avoid-2',
    title: 'Leap and Avoid 2',
    description: 'Master the art of leaping and avoiding in this thrilling sequel! Enhanced gameplay with new challenges.',
    category: GAME_CATEGORIES.ARCADE,
    image: '/img/leap-and-avoid-2.jpg',
    url: 'games/leap-and-avoid-2.html',
    iframeUrl: 'https://www.crazygames.com/embed/leap-and-avoid-2',
    keywords: ['jumping games', 'avoiding games', 'arcade games', 'skill games'],
    featured: false,
    difficulty: 'hard',
    playTime: '15-30 minutes',
    instructions: [
      'Tap or click to make your character jump',
      'Avoid obstacles and dangerous hazards',
      'Time your jumps precisely to clear gaps',
      'Collect power-ups and bonus items',
      'Survive as long as possible in this endless runner'
    ],
    features: [
      'Enhanced sequel with improved mechanics',
      'Challenging obstacle courses and hazards',
      'Power-up system for special abilities',
      'Endless gameplay with increasing difficulty',
      'Smooth animations and responsive controls'
    ],
    tips: [
      'Master the timing of your jumps',
      'Look ahead to plan your next moves',
      'Use double jumps wisely for difficult sections',
      'Don\'t panic - stay focused on the rhythm',
      'Practice on easier sections to build confidence'
    ],
    seoMeta: {
      title: 'Leap and Avoid 2 - Free Jumping Arcade Game Online',
      description: 'Master the art of leaping and avoiding in this thrilling sequel! Enhanced jumping game with challenging obstacles and endless gameplay. Play free!',
      keywords: ['jumping game sequel', 'leap and avoid game', 'arcade jumping game', 'obstacle avoidance game']
    }
  },
  {
    id: 'color-music-hop-ball-games',
    title: 'Color Music Hop Ball Games',
    description: 'Hop to the beat in this colorful music adventure! Rhythm-based gameplay with vibrant visuals.',
    category: GAME_CATEGORIES.ARCADE,
    image: '/img/color-music-hop-ball-games.jpg',
    url: 'games/color-music-hop-ball-games.html',
    iframeUrl: 'https://www.crazygames.com/embed/color-music-hop-ball-games',
    keywords: ['music games', 'rhythm games', 'ball games', 'color games'],
    featured: false,
    difficulty: 'medium',
    playTime: '10-30 minutes',
    instructions: [
      'Tap or click to make the ball hop to the beat',
      'Match the ball color with the platform colors',
      'Follow the rhythm of the music for perfect timing',
      'Avoid platforms with different colors',
      'Collect gems and power-ups along the way'
    ],
    features: [
      'Rhythm-based gameplay synchronized with music',
      'Vibrant color-changing ball and platforms',
      'Multiple music tracks with different beats',
      'Progressive difficulty with faster tempos',
      'Stunning visual effects and animations'
    ],
    tips: [
      'Listen to the music rhythm for better timing',
      'Focus on color matching over speed',
      'Practice with slower songs first',
      'Don\'t get distracted by the visual effects',
      'Develop muscle memory for common patterns'
    ],
    seoMeta: {
      title: 'Color Music Hop Ball Games - Free Rhythm Game Online',
      description: 'Hop to the beat in this colorful music adventure! Rhythm-based ball game with vibrant visuals and catchy music. Play free online now!',
      keywords: ['music ball game', 'rhythm hop game', 'color music game', 'beat matching game']
    }
  },
  {
    id: 'cookie-clicker-pro',
    title: 'Cookie Clicker Pro',
    description: 'Click your way to cookie empire domination in this addictive idle clicker! Build the ultimate cookie factory.',
    category: GAME_CATEGORIES.CLICKER,
    image: '/img/Cookie-Clicker-Pro-Game.jpg',
    url: 'games/cookie-clicker-pro.html',
    iframeUrl: 'https://cloud.onlinegames.io/games/2025/unity/cookie-clicker-pro/index-og.html',
    keywords: ['cookie clicker', 'idle games', 'clicker games', 'incremental games'],
    featured: true,
    difficulty: 'easy',
    playTime: '30+ minutes',
    instructions: [
      'Click the giant cookie to earn cookies',
      'Purchase upgrades to increase cookie production',
      'Buy buildings that generate cookies automatically',
      'Unlock achievements for bonus rewards',
      'Prestige to gain heavenly chips for permanent bonuses'
    ],
    features: [
      'Addictive incremental progression system',
      'Dozens of buildings and upgrades',
      'Achievement system with hundreds of goals',
      'Prestige system for long-term progression',
      'Idle gameplay that continues when away'
    ],
    tips: [
      'Focus on buying the most efficient buildings',
      'Don\'t neglect clicking upgrades early on',
      'Check back regularly for golden cookies',
      'Balance active clicking with idle production',
      'Reset when prestige gains become significant'
    ],
    seoMeta: {
      title: 'Cookie Clicker Pro - Free Idle Clicker Game Online',
      description: 'Build your cookie empire in Cookie Clicker Pro! Addictive idle clicker game with upgrades, achievements, and endless progression. Play free!',
      keywords: ['cookie clicker game', 'idle clicker game', 'incremental game', 'cookie empire game']
    }
  },
  {
    id: 'capybara-clicker-pro',
    title: 'Capybara Clicker Pro',
    description: 'Click adorable capybaras and build the cutest animal empire ever! Relaxing clicker game with cute animals.',
    category: GAME_CATEGORIES.CLICKER,
    image: '/img/Capybara-Clicker-Pro.jpg',
    url: 'games/capybara-clicker-pro.html',
    iframeUrl: 'https://www.onlinegames.io/games/2023/q2/capybara-clicker-pro/index.html',
    keywords: ['capybara games', 'animal games', 'clicker games', 'cute games'],
    featured: true,
    difficulty: 'easy',
    playTime: '20+ minutes',
    instructions: [
      'Click on the capybara to earn happiness points',
      'Buy more capybaras to increase passive income',
      'Upgrade your capybara habitats for better production',
      'Unlock special capybara friends with unique abilities',
      'Complete daily challenges for bonus rewards'
    ],
    features: [
      'Adorable capybara characters and animations',
      'Relaxing and stress-free gameplay',
      'Multiple capybara types with unique personalities',
      'Habitat upgrades and customization options',
      'Peaceful soundtrack and calming visuals'
    ],
    tips: [
      'Focus on buying capybaras that give the best return',
      'Upgrade habitats to maximize capybara happiness',
      'Check for special events and limited-time offers',
      'Don\'t forget to collect offline earnings',
      'Enjoy the relaxing nature of the game'
    ],
    seoMeta: {
      title: 'Capybara Clicker Pro - Free Cute Animal Clicker Game',
      description: 'Click adorable capybaras and build the cutest animal empire! Relaxing clicker game with cute animals and peaceful gameplay. Play free online!',
      keywords: ['capybara clicker game', 'cute animal game', 'relaxing clicker game', 'animal empire game']
    }
  },
  {
    id: 'poop-clicker',
    title: 'Poop Clicker',
    description: 'The most hilariously absurd clicker game you\'ll ever play! Funny and entertaining clicking adventure.',
    category: GAME_CATEGORIES.CLICKER,
    image: '/img/Poop-Clicker.jpg',
    url: 'games/poop-clicker.html',
    iframeUrl: 'https://www.onlinegames.io/games/2024/construct/292/poop-clicker/index.html',
    keywords: ['funny games', 'clicker games', 'humor games', 'silly games'],
    featured: false,
    difficulty: 'easy',
    playTime: '15-45 minutes',
    instructions: [
      'Click the poop to earn stink points',
      'Buy upgrades to increase your clicking power',
      'Purchase automatic poop generators',
      'Unlock funny achievements and milestones',
      'Discover silly power-ups and bonuses'
    ],
    features: [
      'Hilariously absurd humor and theme',
      'Ridiculous upgrades and power-ups',
      'Funny achievements and milestones',
      'Silly sound effects and animations',
      'Entertaining progression system'
    ],
    tips: [
      'Don\'t take it too seriously - it\'s meant to be silly',
      'Focus on the most cost-effective upgrades',
      'Check for hidden easter eggs and jokes',
      'Share funny milestones with friends',
      'Enjoy the absurd humor and have fun'
    ],
    seoMeta: {
      title: 'Poop Clicker - Free Funny Clicker Game Online',
      description: 'The most hilariously absurd clicker game ever! Funny and entertaining clicking adventure with silly humor. Play free online now!',
      keywords: ['funny clicker game', 'poop clicker game', 'silly humor game', 'absurd clicker game']
    }
  },
  {
    id: 'highway-cars',
    title: 'Highway Cars',
    description: 'Race through endless highway traffic at breakneck speeds! High-speed racing with challenging obstacles.',
    category: GAME_CATEGORIES.RACING,
    image: '/img/Highway-Cars.jpg',
    url: 'games/highway-cars.html',
    iframeUrl: 'https://www.onlinegames.io/games/2023/construct/211/highway-cars/index.html',
    keywords: ['car games', 'highway games', 'racing games', 'speed games'],
    featured: false,
    difficulty: 'medium',
    playTime: '10-30 minutes',
    instructions: [
      'Use arrow keys or WASD to control your car',
      'Weave through traffic without crashing',
      'Collect coins and power-ups on the road',
      'Maintain high speeds for bonus points',
      'Avoid collisions to keep your streak alive'
    ],
    features: [
      'Fast-paced endless highway racing',
      'Realistic traffic patterns and AI cars',
      'Multiple car types with different stats',
      'Power-ups and coin collection system',
      'High-speed racing with increasing difficulty'
    ],
    tips: [
      'Stay in the center lanes for more options',
      'Use brief taps for precise movements',
      'Watch for patterns in traffic flow',
      'Don\'t get greedy chasing coins',
      'Build up speed gradually for better control'
    ],
    seoMeta: {
      title: 'Highway Cars - Free High-Speed Racing Game Online',
      description: 'Race through endless highway traffic at breakneck speeds! High-speed racing game with challenging obstacles and fast action. Play free!',
      keywords: ['highway racing game', 'endless car game', 'high-speed driving game', 'traffic racing game']
    }
  },
  {
    id: 'secret-galaxy-match-three',
    title: 'Secret Galaxy Match Three',
    description: 'Embark on a cosmic puzzle adventure through the secret galaxy! Match gems among the stars.',
    category: GAME_CATEGORIES.PUZZLE,
    image: '/img/Block Crasher.jpg',
    url: 'games/secret-galaxy-match-three.html',
    iframeUrl: 'https://html5.gamedistribution.com/42fb822bb06f41299d218b5262248eba/?gd_sdk_referrer_url=https://www.funnyjourneys.com/games/secret-galaxy-match-three',
    keywords: ['galaxy games', 'match 3 games', 'space games', 'puzzle games'],
    featured: false,
    difficulty: 'medium',
    playTime: '20-45 minutes',
    instructions: [
      'Match 3 or more identical gems to clear them',
      'Swap adjacent gems to create matches',
      'Complete cosmic objectives in each level',
      'Create special gems with larger matches',
      'Use starlight power-ups to clear difficult sections'
    ],
    features: [
      'Stunning space and galaxy-themed graphics',
      'Multiple cosmic worlds to explore',
      'Special galaxy gems and power-ups',
      'Challenging objectives and star ratings',
      'Beautiful stellar animations and effects'
    ],
    tips: [
      'Look for opportunities to create galaxy gems',
      'Focus on objectives rather than just high scores',
      'Use power-ups strategically for tough levels',
      'Create cascading matches for bonus points',
      'Plan moves ahead to maximize efficiency'
    ],
    seoMeta: {
      title: 'Secret Galaxy Match Three - Free Space Puzzle Game',
      description: 'Embark on a cosmic puzzle adventure through the secret galaxy! Match gems among the stars in this beautiful space puzzle game. Play free!',
      keywords: ['galaxy match 3 game', 'space puzzle game', 'cosmic match three', 'star matching game']
    }
  },
  {
    id: 'happy-blocks',
    title: 'Happy Blocks',
    description: 'Colorful block puzzle fun with cheerful graphics and addictive gameplay! Perfect for all ages.',
    category: GAME_CATEGORIES.PUZZLE,
    image: '/img/Happy Blocks.jpg',
    url: 'games/happy-blocks.html',
    iframeUrl: 'https://html5.gamedistribution.com/904bc37384d64d90bd310319fee5d0db/?gd_sdk_referrer_url=https://www.funnyjourneys.com/games/happy-blocks',
    keywords: ['block games', 'puzzle games', 'happy games', 'colorful games'],
    featured: false,
    difficulty: 'easy',
    playTime: '15-40 minutes',
    instructions: [
      'Drag and drop blocks to fit them in the grid',
      'Fill complete rows or columns to clear them',
      'Plan your moves to avoid running out of space',
      'Use the preview to see upcoming block shapes',
      'Score points by clearing multiple lines at once'
    ],
    features: [
      'Cheerful and colorful block designs',
      'Relaxing puzzle gameplay for all ages',
      'Smooth drag-and-drop controls',
      'Progressive difficulty with new challenges',
      'Happy music and positive sound effects'
    ],
    tips: [
      'Try to keep the grid as clear as possible',
      'Look for opportunities to clear multiple lines',
      'Don\'t rush - take time to plan your moves',
      'Focus on creating space for larger blocks',
      'Use corners and edges strategically'
    ],
    seoMeta: {
      title: 'Happy Blocks - Free Colorful Block Puzzle Game',
      description: 'Enjoy colorful block puzzle fun with Happy Blocks! Cheerful graphics and addictive gameplay perfect for all ages. Play free online now!',
      keywords: ['happy block game', 'colorful puzzle game', 'block fitting game', 'family puzzle game']
    }
  },
  // === 新增高质量游戏 ===
  {
    id: 'fps-strike',
    title: 'FPS Strike',
    description: 'If you feel like playing a quick FPS match but all the hassle (finding a game, installing it, and customizing your player or loadout before the battle) is way too much, you\'re in the right place. Enter FPS Strike, load the game and press the start button and voila! You\'ll find yourself in the middle of the battlefield in seconds.',
    category: GAME_CATEGORIES.ACTION,
    image: 'https://www.onlinegames.io/media/posts/902/responsive/fps-strike-online-xs.jpg',
    url: 'games/fps-strike.html',
    iframeUrl: 'https://cloud.onlinegames.io/games/2024/unity2/fps-strike/index-og.html',
    keywords: ["3d","action","arena","army","battle","battle-royale"],
    featured: false,
    difficulty: 'hard',
    playTime: '30+ minutes',
    instructions: [
      "Use WASD keys to move your character",
      "Click mouse or spacebar to attack",
      "Collect health and ammo pickups",
      "Defeat enemies to progress",
      "Watch out for boss battles"
    ],
    features: [
      "Intense combat system",
      "Multiple weapon types",
      "Progressive difficulty",
      "Special abilities",
      "Engaging storyline"
    ],
    tips: [
      "Keep moving to avoid enemy fire",
      "Use cover when reloading",
      "Aim for weak points on enemies",
      "Manage your resources carefully",
      "Learn enemy attack patterns"
    ],
    seoMeta: {
      title: 'FPS Strike - Free Online Game | Play Now',
      description: 'Play FPS Strike free online! If you feel like playing a quick FPS match but all the hassle (finding a game, installing it, and cu... No download required!',
      keywords: ["3d","action","arena","army"]
    }
  },
  {
    id: 'survival-karts',
    title: 'Survival Karts',
    description: 'Looking for the coolest, most chaotic online racing game? Play Survival Karts on OnlineGames.io! It\'s a survival showdown on an icy, hole-riddled track!',
    category: GAME_CATEGORIES.RACING,
    image: 'https://www.onlinegames.io/media/posts/887/responsive/survival-karts-play-xs.jpg',
    url: 'games/survival-karts.html',
    iframeUrl: 'https://cloud.onlinegames.io/games/2024/unity3/survival-karts/index-og.html',
    keywords: ["3d","battle","battle-royale","crazy","destroy","driving"],
    featured: false,
    difficulty: 'hard',
    playTime: '10-30 minutes',
    instructions: [
      "Use arrow keys or WASD to control your vehicle",
      "Press spacebar for handbrake or boost",
      "Follow the track and avoid obstacles",
      "Collect power-ups along the way",
      "Complete laps to win the race"
    ],
    features: [
      "Realistic driving physics",
      "Multiple vehicle options",
      "Dynamic racing tracks",
      "Speed boost mechanics",
      "Competitive gameplay"
    ],
    tips: [
      "Learn the track layout for better lap times",
      "Use brakes strategically on turns",
      "Collect boost items for speed advantage",
      "Stay on the optimal racing line",
      "Practice makes perfect"
    ],
    seoMeta: {
      title: 'Survival Karts - Free Online Game | Play Now',
      description: 'Play Survival Karts free online! Looking for the coolest, most chaotic online racing game? Play Survival Karts on OnlineGames.io! ... No download required!',
      keywords: ["3d","battle","battle-royale","crazy"]
    }
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird',
    description: 'The classic addictive flying game! Navigate your bird through obstacles in this challenging and fun arcade adventure.',
    category: GAME_CATEGORIES.ARCADE,
    image: '/img/flappy-bird.jpg',
    url: 'games/flappy-bird.html',
    iframeUrl: 'https://cloud.onlinegames.io/games/2025/html/flappy-bird/index-og.html',
    keywords: ['flappy bird', 'flying games', 'arcade games', 'classic games'],
    featured: true,
    difficulty: 'medium',
    playTime: '5-15 minutes',
    instructions: [
      'Tap or click to make the bird flap its wings',
      'Navigate through the green pipes without touching them',
      'Try to get the highest score possible',
      'Keep a steady rhythm for better control',
      'Practice to improve your reflexes'
    ],
    features: [
      'Classic Flappy Bird gameplay',
      'Simple one-tap controls',
      'Challenging obstacle navigation',
      'Score tracking system',
      'Addictive arcade action'
    ],
    tips: [
      'Stay calm and maintain steady tapping',
      'Look ahead to plan your moves',
      'Find your tapping rhythm',
      'Don\'t tap too fast or too slow',
      'Practice makes perfect!'
    ],
    seoMeta: {
      title: 'Flappy Bird - Free Classic Flying Game Online',
      description: 'Play the classic Flappy Bird game online for free! Navigate your bird through obstacles in this addictive arcade adventure. Start playing now!',
      keywords: ['flappy bird game', 'free flying game', 'classic arcade game', 'obstacle navigation game']
    }
  },
  {
    id: 'neon-slither-sim',
    title: 'Neon Slither Sim',
    description: 'Grow your neon snake in this exciting multiplayer simulation! Collect orbs, avoid other snakes, and become the longest slither.',
    category: GAME_CATEGORIES.ARCADE,
    image: '/img/neon_slither_sim.jpg',
    url: 'games/neon-slither-sim.html',
    iframeUrl: 'https://cloud.onlinegames.io/games/2022/construct/157/neon-slither-sim/index-og.html',
    keywords: ['slither games', 'snake games', 'neon games', 'multiplayer games'],
    featured: false,
    difficulty: 'medium',
    playTime: '15-30 minutes',
    instructions: [
      'Use mouse to control your snake\'s direction',
      'Collect colorful orbs to grow longer',
      'Avoid hitting other snakes or walls',
      'Cut off other snakes to eliminate them',
      'Try to become the longest snake on the server'
    ],
    features: [
      'Vibrant neon graphics and effects',
      'Smooth snake movement mechanics',
      'Competitive multiplayer gameplay',
      'Dynamic orb collection system',
      'Real-time leaderboard tracking'
    ],
    tips: [
      'Stay away from larger snakes early on',
      'Use your body to trap smaller snakes',
      'Collect orbs in less crowded areas',
      'Be patient and strategic with your moves',
      'Watch for opportunities to cut off opponents'
    ],
    seoMeta: {
      title: 'Neon Slither Sim - Free Multiplayer Snake Game Online',
      description: 'Play Neon Slither Sim online! Grow your neon snake, collect orbs, and compete with players worldwide. Free multiplayer snake game!',
      keywords: ['neon slither game', 'multiplayer snake game', 'slither.io alternative', 'neon snake game']
    }
  },
  {
    id: 'motorbike-stunt-simulator',
    title: 'Motorbike Stunt Simulator',
    description: 'Perform amazing stunts and tricks on your motorbike! Master gravity-defying jumps and become the ultimate stunt rider.',
    category: GAME_CATEGORIES.RACING,
    image: '/img/motorbike_stunt_simulator.jpg',
    url: 'games/motorbike-stunt-simulator.html',
    iframeUrl: 'https://cloud.onlinegames.io/games/2021/unity/motorbike-stunt-simulator/index-og.html',
    keywords: ['motorbike games', 'stunt games', 'racing games', 'simulator games'],
    featured: false,
    difficulty: 'hard',
    playTime: '20-45 minutes',
    instructions: [
      'Use arrow keys or WASD to control the motorbike',
      'Press spacebar for boost and special tricks',
      'Balance your bike during jumps and landings',
      'Complete challenging stunt courses',
      'Master different types of motorcycles'
    ],
    features: [
      'Realistic motorcycle physics simulation',
      'Multiple challenging stunt tracks',
      'Various motorcycle models to choose from',
      'Spectacular jump and trick mechanics',
      '3D graphics with detailed environments'
    ],
    tips: [
      'Practice controlling your bike\'s balance',
      'Use boost strategically for big jumps',
      'Land smoothly to maintain speed',
      'Learn each track\'s optimal route',
      'Start with easier bikes before advanced ones'
    ],
    seoMeta: {
      title: 'Motorbike Stunt Simulator - Free 3D Racing Game Online',
      description: 'Master amazing motorbike stunts in this realistic simulator! Perform gravity-defying tricks and jumps. Play free online now!',
      keywords: ['motorbike stunt game', '3d motorcycle simulator', 'bike racing game', 'stunt driving game']
    }
  },
  {
    id: 'mega-soccer',
    title: 'Mega Soccer',
    description: 'Experience the thrill of soccer with realistic gameplay! Score goals, make saves, and lead your team to victory in this exciting football game.',
    category: GAME_CATEGORIES.CASUAL,
    image: '/img/mega-soccer-game.jpg',
    url: 'games/mega-soccer.html',
    iframeUrl: 'https://cloud.onlinegames.io/games/2024/unity2/mega-soccer/index-og.html',
    keywords: ['soccer games', 'football games', 'sports games', 'team games'],
    featured: false,
    difficulty: 'medium',
    playTime: '15-30 minutes',
    instructions: [
      'Use arrow keys to move your player',
      'Press spacebar to kick or tackle',
      'Switch between players automatically',
      'Score goals to win matches',
      'Master passing and shooting techniques'
    ],
    features: [
      'Realistic soccer gameplay mechanics',
      'Multiple teams and formations',
      'Dynamic AI opponents',
      'Tournament and quick match modes',
      'Smooth player controls and animations'
    ],
    tips: [
      'Practice your passing accuracy',
      'Time your shots for maximum power',
      'Use different formations strategically',
      'Watch opponent patterns for counter-attacks',
      'Master both offensive and defensive play'
    ],
    seoMeta: {
      title: 'Mega Soccer - Free Football Game Online',
      description: 'Play Mega Soccer online! Experience realistic football gameplay with teams, tournaments, and exciting matches. Free soccer game!',
      keywords: ['mega soccer game', 'free football game', 'soccer simulation', 'sports game online']
    }
  },
  {
    id: 'julie-beauty-salon',
    title: 'Julie Beauty Salon',
    description: 'Run your own beauty salon and help clients look their best! Provide makeovers, styling, and beauty treatments in this fun simulation game.',
    category: GAME_CATEGORIES.CASUAL,
    image: '/img/Julie-Beauty-Salon.jpg',
    url: 'games/julie-beauty-salon.html',
    iframeUrl: 'https://cloud.onlinegames.io/games/2021/1/julie-beauty-salon/index-og.html',
    keywords: ['beauty salon games', 'makeover games', 'girl games', 'simulation games'],
    featured: false,
    difficulty: 'easy',
    playTime: '20-40 minutes',
    instructions: [
      'Click on tools and treatments to use them',
      'Follow customer requests for specific services',
      'Complete makeovers within the time limit',
      'Earn money to upgrade your salon',
      'Keep customers happy for better tips'
    ],
    features: [
      'Complete beauty salon management',
      'Various hairstyling and makeup options',
      'Customer satisfaction system',
      'Salon upgrade and customization',
      'Multiple beauty treatment mini-games'
    ],
    tips: [
      'Listen carefully to customer preferences',
      'Work efficiently to serve more clients',
      'Upgrade equipment for better services',
      'Keep your salon clean and organized',
      'Happy customers give better reviews'
    ],
    seoMeta: {
      title: 'Julie Beauty Salon - Free Makeover Simulation Game',
      description: 'Run your own beauty salon in Julie Beauty Salon! Provide makeovers, styling, and beauty treatments. Free salon simulation game!',
      keywords: ['beauty salon game', 'makeover simulation', 'hairstyling game', 'salon management game']
    }
  }
];

// Helper functions for game management
export const gameUtils = {
  // Get all games
  getAllGames() {
    return GAMES_DATABASE;
  },

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
  searchGames(query, games = null) {
    const searchTerm = query.toLowerCase();
    const gamesArray = games || GAMES_DATABASE;
    return gamesArray.filter(game => 
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