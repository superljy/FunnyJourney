/**
 * Sitemap更新脚本
 * 添加新增的5个游戏到sitemap.xml
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 新增游戏信息
const newGames = [
  {
    id: 'flappy-bird',
    title: 'Flappy Bird - Free Classic Flying Game',
    description: 'Play the classic Flappy Bird game online for free! Navigate your bird through obstacles in this addictive arcade adventure.',
    priority: '0.9', // Featured game
    featured: true
  },
  {
    id: 'neon-slither-sim',
    title: 'Neon Slither Sim - Free Multiplayer Snake Game',
    description: 'Play Neon Slither Sim online! Grow your neon snake, collect orbs, and compete with players worldwide.',
    priority: '0.8',
    featured: false
  },
  {
    id: 'motorbike-stunt-simulator',
    title: 'Motorbike Stunt Simulator - Free 3D Racing Game',
    description: 'Master amazing motorbike stunts in this realistic simulator! Perform gravity-defying tricks and jumps.',
    priority: '0.8',
    featured: false
  },
  {
    id: 'mega-soccer',
    title: 'Mega Soccer - Free Football Game Online',
    description: 'Play Mega Soccer online! Experience realistic football gameplay with teams, tournaments, and exciting matches.',
    priority: '0.8',
    featured: false
  },
  {
    id: 'julie-beauty-salon',
    title: 'Julie Beauty Salon - Free Makeover Simulation Game',
    description: 'Run your own beauty salon in Julie Beauty Salon! Provide makeovers, styling, and beauty treatments.',
    priority: '0.8',
    featured: false
  }
];

function updateSitemap() {
  const sitemapPath = path.join(__dirname, '../sitemap.xml');
  
  try {
    // 读取现有sitemap
    let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    console.log('📄 正在更新sitemap.xml...\n');
    
    // 检查新游戏是否已存在
    const existingGames = [];
    const missingGames = [];
    
    newGames.forEach(game => {
      if (sitemapContent.includes(`games/${game.id}.html`)) {
        existingGames.push(game.id);
      } else {
        missingGames.push(game);
      }
    });
    
    if (existingGames.length > 0) {
      console.log('✅ 已存在的游戏:');
      existingGames.forEach(gameId => console.log(`   - ${gameId}`));
      console.log('');
    }
    
    if (missingGames.length === 0) {
      console.log('🎉 所有新增游戏都已在sitemap中！');
      return;
    }
    
    console.log('📝 需要添加的游戏:');
    missingGames.forEach(game => console.log(`   - ${game.id}`));
    console.log('');
    
    // 生成新游戏的XML条目
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    let newGameEntries = '';
    missingGames.forEach(game => {
      const imageUrl = getGameImageUrl(game.id);
      const xmlEntry = `
    <!-- ${game.title} -->
    <url>
        <loc>https://funnyjourneys.github.io/games/${game.id}.html</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${game.priority}</priority>
        <image:image>
            <image:loc>${imageUrl}</image:loc>
            <image:title>${game.title}</image:title>
            <image:caption>${game.description}</image:caption>
        </image:image>
    </url>`;
      
      newGameEntries += xmlEntry;
    });
    
    // 查找插入位置（在</urlset>标签之前）
    const insertPosition = sitemapContent.lastIndexOf('</urlset>');
    
    if (insertPosition === -1) {
      throw new Error('无法找到</urlset>标签');
    }
    
    // 插入新游戏条目
    const updatedSitemap = 
      sitemapContent.substring(0, insertPosition) + 
      newGameEntries + 
      '\n' + 
      sitemapContent.substring(insertPosition);
    
    // 写回文件
    fs.writeFileSync(sitemapPath, updatedSitemap, 'utf8');
    
    console.log('✅ Sitemap更新完成！');
    console.log(`📊 添加了 ${missingGames.length} 个新游戏条目`);
    console.log(`📅 最后修改日期: ${currentDate}`);
    
    // 验证更新结果
    const verifyContent = fs.readFileSync(sitemapPath, 'utf8');
    const totalUrls = (verifyContent.match(/<url>/g) || []).length;
    console.log(`🔍 总URL数量: ${totalUrls}`);
    
  } catch (error) {
    console.error('❌ Sitemap更新失败:', error);
  }
}

function getGameImageUrl(gameId) {
  // 根据游戏ID返回对应的图片URL
  const imageMapping = {
    'flappy-bird': 'https://funnyjourneys.github.io/img/flappy-bird.jpg',
    'neon-slither-sim': 'https://funnyjourneys.github.io/img/neon_slither_sim.jpg',
    'motorbike-stunt-simulator': 'https://funnyjourneys.github.io/img/motorbike_stunt_simulator.jpg',
    'mega-soccer': 'https://funnyjourneys.github.io/img/mega-soccer-game.jpg',
    'julie-beauty-salon': 'https://funnyjourneys.github.io/img/Julie-Beauty-Salon.jpg'
  };
  
  return imageMapping[gameId] || `https://funnyjourneys.github.io/img/${gameId}.jpg`;
}

// 执行更新
console.log('🗺️  Sitemap更新工具\n');
updateSitemap(); 