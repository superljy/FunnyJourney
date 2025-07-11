#!/usr/bin/env node

/**
 * FunnyJourney游戏数据更新脚本
 * 从games.json导入新游戏到src/data/games.js
 * 避免重复，增强数据结构，生成AI内容
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 文件路径
const GAMES_JSON_PATH = path.join(__dirname, '../games.json');
const CURRENT_GAMES_PATH = path.join(__dirname, '../src/data/games.js');
const BACKUP_PATH = path.join(__dirname, '../src/data/games.backup.js');

// 游戏分类映射
const CATEGORY_MAPPING = {
  'racing': 'racing',
  'car': 'racing', 
  'driving': 'racing',
  'bike': 'racing',
  'truck': 'racing',
  'action': 'action',
  'shooting': 'action',
  'gun': 'action',
  'war': 'action',
  'fight': 'action',
  'arcade': 'arcade',
  'classic': 'arcade',
  'retro': 'arcade',
  'puzzle': 'puzzle',
  'brain': 'puzzle',
  'logic': 'puzzle',
  'match': 'puzzle',
  'strategy': 'strategy',
  'tower': 'strategy',
  'defense': 'strategy',
  'casual': 'casual',
  'fun': 'casual',
  'simple': 'casual',
  'clicker': 'clicker',
  'idle': 'clicker',
  'tap': 'clicker',
  'adventure': 'adventure',
  'rpg': 'adventure',
  'quest': 'adventure',
  'card': 'card',
  'poker': 'card',
  'solitaire': 'card'
};

// 难度推断规则
const DIFFICULTY_RULES = {
  easy: ['casual', 'clicker', 'simple', 'kids', 'easy'],
  medium: ['racing', 'arcade', 'puzzle', 'card'],
  hard: ['action', 'strategy', 'shooting', 'complex', '3d']
};

// 游戏时长推断规则
const PLAYTIME_RULES = {
  '5-15 minutes': ['clicker', 'casual', 'simple'],
  '10-30 minutes': ['arcade', 'racing', 'puzzle', 'card'],
  '30+ minutes': ['action', 'strategy', 'adventure', 'rpg']
};

/**
 * 生成游戏ID (slug)
 */
function generateGameId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * 从标签推断游戏分类
 */
function inferCategory(tags) {
  const tagList = tags.toLowerCase().split(',').map(t => t.trim());
  
  for (const tag of tagList) {
    if (CATEGORY_MAPPING[tag]) {
      return CATEGORY_MAPPING[tag];
    }
  }
  
  // 默认分类
  return 'casual';
}

/**
 * 推断游戏难度
 */
function inferDifficulty(tags, category) {
  const tagList = tags.toLowerCase().split(',').map(t => t.trim());
  tagList.push(category);
  
  for (const [difficulty, keywords] of Object.entries(DIFFICULTY_RULES)) {
    if (keywords.some(keyword => tagList.includes(keyword))) {
      return difficulty;
    }
  }
  
  return 'medium';
}

/**
 * 推断游戏时长
 */
function inferPlayTime(tags, category) {
  const tagList = tags.toLowerCase().split(',').map(t => t.trim());
  tagList.push(category);
  
  for (const [playTime, keywords] of Object.entries(PLAYTIME_RULES)) {
    if (keywords.some(keyword => tagList.includes(keyword))) {
      return playTime;
    }
  }
  
  return '10-30 minutes';
}

/**
 * 生成AI增强内容
 */
function generateEnhancedContent(title, description, category, tags) {
  const tagList = tags.split(',').map(t => t.trim());
  
  // 基于游戏类型生成操作指南
  const instructions = generateInstructions(category, tagList);
  
  // 生成特色功能
  const features = generateFeatures(category, tagList);
  
  // 生成游戏技巧
  const tips = generateTips(category, tagList);
  
  // 生成SEO元数据
  const seoMeta = generateSeoMeta(title, description, category, tagList);
  
  return { instructions, features, tips, seoMeta };
}

/**
 * 生成操作指南
 */
function generateInstructions(category, tags) {
  const baseInstructions = {
    racing: [
      'Use arrow keys or WASD to control your vehicle',
      'Press spacebar for handbrake or special actions',
      'Follow the track and avoid obstacles',
      'Collect power-ups and bonuses on the way',
      'Complete laps or reach the finish line to win'
    ],
    action: [
      'Use arrow keys or WASD to move your character',
      'Click or press spacebar to attack/shoot',
      'Use number keys for weapon switching',
      'Watch your health and ammo levels',
      'Complete objectives to advance levels'
    ],
    puzzle: [
      'Click and drag pieces to move them',
      'Match colors, shapes, or patterns',
      'Think ahead and plan your moves',
      'Use hints if you get stuck',
      'Complete each level to unlock the next'
    ],
    arcade: [
      'Use arrow keys or mouse to control',
      'Collect items and avoid obstacles',
      'Score points to beat high scores',
      'Watch for special power-ups',
      'Survive as long as possible'
    ],
    clicker: [
      'Click on the main object to earn points',
      'Purchase upgrades to increase efficiency',
      'Unlock new features as you progress',
      'Use automated helpers for passive income',
      'Aim for higher levels and achievements'
    ]
  };
  
  return baseInstructions[category] || baseInstructions.arcade;
}

/**
 * 生成特色功能
 */
function generateFeatures(category, tags) {
  const commonFeatures = [
    'Smooth and responsive controls',
    'Engaging gameplay mechanics',
    'Progressive difficulty system',
    'Achievement and scoring system',
    'Mobile-friendly interface'
  ];
  
  const categoryFeatures = {
    racing: [
      'Multiple vehicle options',
      'Realistic physics engine',
      'Various racing tracks',
      'Speed boost mechanics',
      'Collision detection system'
    ],
    action: [
      'Multiple weapon types',
      'Dynamic enemy AI',
      'Special attack combos',
      'Health and power-up system',
      'Multiple game modes'
    ],
    puzzle: [
      'Challenging brain teasers',
      'Hint system available',
      'Multiple difficulty levels',
      'Pattern recognition gameplay',
      'Logical thinking required'
    ]
  };
  
  return categoryFeatures[category] || commonFeatures;
}

/**
 * 生成游戏技巧
 */
function generateTips(category, tags) {
  const baseTips = {
    racing: [
      'Learn the track layout for better performance',
      'Use brakes wisely on sharp turns',
      'Collect boost items for speed advantages',
      'Stay on the racing line for optimal speed',
      'Practice timing for perfect starts'
    ],
    action: [
      'Keep moving to avoid enemy attacks',
      'Aim for headshots for maximum damage',
      'Use cover effectively during battles',
      'Manage your ammunition carefully',
      'Learn enemy attack patterns'
    ],
    puzzle: [
      'Start with corner pieces in jigsaw puzzles',
      'Look for patterns and color matches',
      'Take breaks if you feel stuck',
      'Work systematically from one area',
      'Use the hint system sparingly'
    ],
    clicker: [
      'Focus on early upgrades for better efficiency',
      'Balance manual clicking with automation',
      'Invest in multiplier upgrades first',
      'Check back regularly for progress',
      'Plan your upgrade strategy ahead'
    ]
  };
  
  return baseTips[category] || baseTips.racing;
}

/**
 * 生成SEO元数据
 */
function generateSeoMeta(title, description, category, tags) {
  const categoryKeywords = {
    racing: ['racing game', 'car game', 'driving game', 'speed game'],
    action: ['action game', 'shooting game', 'adventure game', 'battle game'],
    puzzle: ['puzzle game', 'brain game', 'logic game', 'mind game'],
    arcade: ['arcade game', 'classic game', 'retro game', 'fun game'],
    clicker: ['clicker game', 'idle game', 'incremental game', 'tap game']
  };
  
  const keywords = categoryKeywords[category] || ['online game', 'browser game', 'free game'];
  keywords.push('free online', 'no download', 'instant play');
  
  return {
    title: `${title} - Free Online ${category.charAt(0).toUpperCase() + category.slice(1)} Game | Play Now`,
    description: `Play ${title} free online! ${description.substring(0, 120)}... No download required - start playing instantly!`,
    keywords: [...keywords, ...tags.slice(0, 4)]
  };
}

/**
 * 读取现有游戏数据
 */
function readCurrentGames() {
  try {
    const content = fs.readFileSync(CURRENT_GAMES_PATH, 'utf8');
    const games = [];
    
    // 简单提取游戏标题（正则匹配）
    const titleMatches = content.match(/title:\s*['"`]([^'"`]+)['"`]/g);
    if (titleMatches) {
      titleMatches.forEach(match => {
        const title = match.match(/title:\s*['"`]([^'"`]+)['"`]/)[1];
        games.push(title.toLowerCase());
      });
    }
    
    return games;
  } catch (error) {
    console.warn('无法读取现有游戏数据，将创建新文件');
    return [];
  }
}

/**
 * 读取games.json数据
 */
function readGamesJson() {
  try {
    const content = fs.readFileSync(GAMES_JSON_PATH, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('无法读取games.json文件:', error.message);
    process.exit(1);
  }
}

/**
 * 过滤重复游戏
 */
function filterDuplicateGames(newGames, existingTitles) {
  const filtered = [];
  const duplicates = [];
  
  newGames.forEach(game => {
    const titleLower = game.title.toLowerCase();
    if (existingTitles.includes(titleLower)) {
      duplicates.push(game.title);
    } else {
      filtered.push(game);
    }
  });
  
  console.log(`📊 发现重复游戏: ${duplicates.length}个`);
  if (duplicates.length > 0) {
    console.log('重复游戏列表:', duplicates.join(', '));
  }
  
  return { filtered, duplicates };
}

/**
 * 转换游戏数据格式
 */
function convertGameData(game) {
  const id = generateGameId(game.title);
  const category = inferCategory(game.tags);
  const difficulty = inferDifficulty(game.tags, category);
  const playTime = inferPlayTime(game.tags, category);
  const keywords = game.tags.split(',').map(tag => tag.trim()).slice(0, 8);
  
  // 生成AI增强内容
  const enhanced = generateEnhancedContent(game.title, game.description, category, game.tags);
  
  return {
    id,
    title: game.title,
    description: game.description,
    category: `GAME_CATEGORIES.${category.toUpperCase()}`,
    image: game.image,
    url: `games/${id}.html`,
    iframeUrl: game.embed,
    keywords,
    featured: false,
    difficulty,
    playTime,
    ...enhanced
  };
}

/**
 * 生成新的games.js文件内容
 */
function generateGamesFile(existingGames, newGames) {
  const allGames = [...existingGames, ...newGames];
  
  let content = `// Games Database for FunnyJourney Platform
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
`;

  // 添加现有游戏（保持原有数据）
  content += `  // === 现有游戏 (${existingGames.length}个) ===\n`;
  
  // 添加新游戏
  content += `  // === 新增游戏 (${newGames.length}个) ===\n`;
  newGames.forEach((game, index) => {
    content += `  {\n`;
    content += `    id: '${game.id}',\n`;
    content += `    title: '${game.title}',\n`;
    content += `    description: '${game.description.replace(/'/g, "\\'")}',\n`;
    content += `    category: ${game.category},\n`;
    content += `    image: '${game.image}',\n`;
    content += `    url: '${game.url}',\n`;
    content += `    iframeUrl: '${game.iframeUrl}',\n`;
    content += `    keywords: ${JSON.stringify(game.keywords)},\n`;
    content += `    featured: ${game.featured},\n`;
    content += `    difficulty: '${game.difficulty}',\n`;
    content += `    playTime: '${game.playTime}',\n`;
    content += `    instructions: ${JSON.stringify(game.instructions, null, 6)},\n`;
    content += `    features: ${JSON.stringify(game.features, null, 6)},\n`;
    content += `    tips: ${JSON.stringify(game.tips, null, 6)},\n`;
    content += `    seoMeta: {\n`;
    content += `      title: '${game.seoMeta.title.replace(/'/g, "\\'")}',\n`;
    content += `      description: '${game.seoMeta.description.replace(/'/g, "\\'")}',\n`;
    content += `      keywords: ${JSON.stringify(game.seoMeta.keywords)}\n`;
    content += `    }\n`;
    content += `  }${index < newGames.length - 1 ? ',' : ''}\n`;
  });
  
  content += `];

// 游戏工具函数
export const gameUtils = {
  // 获取所有游戏
  getAllGames: () => GAMES_DATABASE,
  
  // 根据分类获取游戏
  getGamesByCategory: (category) => GAMES_DATABASE.filter(game => game.category === category),
  
  // 获取特色游戏
  getFeaturedGames: () => GAMES_DATABASE.filter(game => game.featured),
  
  // 根据ID获取游戏
  getGameById: (id) => GAMES_DATABASE.find(game => game.id === id),
  
  // 搜索游戏
  searchGames: (query) => {
    const q = query.toLowerCase();
    return GAMES_DATABASE.filter(game => 
      game.title.toLowerCase().includes(q) ||
      game.description.toLowerCase().includes(q) ||
      game.keywords.some(keyword => keyword.toLowerCase().includes(q))
    );
  },
  
  // 获取随机游戏
  getRandomGames: (count = 6) => {
    const shuffled = [...GAMES_DATABASE].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },
  
  // 获取相关游戏
  getRelatedGames: (currentGame, count = 4) => {
    return GAMES_DATABASE
      .filter(game => game.id !== currentGame.id && game.category === currentGame.category)
      .slice(0, count);
  }
};
`;

  return content;
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 开始更新FunnyJourney游戏数据...\n');
  
  // 1. 备份现有文件
  if (fs.existsSync(CURRENT_GAMES_PATH)) {
    fs.copyFileSync(CURRENT_GAMES_PATH, BACKUP_PATH);
    console.log('✅ 已备份现有games.js到games.backup.js');
  }
  
  // 2. 读取现有游戏
  const existingTitles = readCurrentGames();
  console.log(`📊 现有游戏数量: ${existingTitles.length}个`);
  
  // 3. 读取新游戏数据
  const gamesJsonData = readGamesJson();
  console.log(`📊 games.json游戏数量: ${gamesJsonData.length}个`);
  
  // 4. 过滤重复游戏
  const { filtered: newGames, duplicates } = filterDuplicateGames(gamesJsonData, existingTitles);
  console.log(`📊 可新增游戏数量: ${newGames.length}个`);
  
  // 5. 选择前50个高优先级游戏
  const priorityGames = newGames
    .map(game => ({
      ...game,
      priority: calculatePriority(game.tags)
    }))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 50);
  
  console.log(`🎯 选择前50个高优先级游戏进行集成`);
  
  // 6. 转换游戏数据格式
  const convertedGames = priorityGames.map(convertGameData);
  console.log(`✅ 已转换${convertedGames.length}个游戏数据`);
  
  // 7. 注意：由于现有games.js结构复杂，我们只输出新游戏数据供手动集成
  const newGamesContent = convertedGames.map((game, index) => {
    let content = `  {\n`;
    content += `    id: '${game.id}',\n`;
    content += `    title: '${game.title}',\n`;
    content += `    description: '${game.description.replace(/'/g, "\\'")}',\n`;
    content += `    category: ${game.category},\n`;
    content += `    image: '${game.image}',\n`;
    content += `    url: '${game.url}',\n`;
    content += `    iframeUrl: '${game.iframeUrl}',\n`;
    content += `    keywords: ${JSON.stringify(game.keywords)},\n`;
    content += `    featured: ${game.featured},\n`;
    content += `    difficulty: '${game.difficulty}',\n`;
    content += `    playTime: '${game.playTime}',\n`;
    content += `    instructions: ${JSON.stringify(game.instructions, null, 6)},\n`;
    content += `    features: ${JSON.stringify(game.features, null, 6)},\n`;
    content += `    tips: ${JSON.stringify(game.tips, null, 6)},\n`;
    content += `    seoMeta: {\n`;
    content += `      title: '${game.seoMeta.title.replace(/'/g, "\\'")}',\n`;
    content += `      description: '${game.seoMeta.description.replace(/'/g, "\\'")}',\n`;
    content += `      keywords: ${JSON.stringify(game.seoMeta.keywords)}\n`;
    content += `    }\n`;
    content += `  }${index < convertedGames.length - 1 ? ',' : ''}`;
    return content;
  }).join(',\n');
  
  // 8. 写入新游戏数据文件供手动集成
  const outputPath = path.join(__dirname, '../new-games-data.js');
  fs.writeFileSync(outputPath, `// 新增游戏数据 - 需要手动集成到src/data/games.js\n// 添加到GAMES_DATABASE数组中\n\n${newGamesContent}\n`);
  
  console.log(`\n✅ 游戏数据更新完成！`);
  console.log(`📁 新游戏数据已保存到: ${outputPath}`);
  console.log(`📊 统计信息:`);
  console.log(`   - 原有游戏: ${existingTitles.length}个`);
  console.log(`   - 新增游戏: ${convertedGames.length}个`);
  console.log(`   - 重复跳过: ${duplicates.length}个`);
  console.log(`   - 总计游戏: ${existingTitles.length + convertedGames.length}个`);
  console.log(`\n🔄 下一步: 手动将新游戏数据集成到src/data/games.js中`);
}

/**
 * 计算游戏优先级
 */
function calculatePriority(tags) {
  const tagList = tags.toLowerCase().split(',').map(t => t.trim());
  let priority = 0;
  
  // 高价值标签
  const highValueTags = ['3d', 'multiplayer', 'racing', 'action', 'shooting'];
  const mediumValueTags = ['arcade', 'puzzle', 'strategy', 'adventure'];
  const lowValueTags = ['2d', 'simple', 'casual'];
  
  tagList.forEach(tag => {
    if (highValueTags.includes(tag)) priority += 3;
    else if (mediumValueTags.includes(tag)) priority += 2;
    else if (lowValueTags.includes(tag)) priority += 1;
  });
  
  return priority;
}

// 运行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}