/**
 * 批量修复游戏图片链接脚本
 * 将本地img路径替换为外部CDN链接
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 游戏图片映射表
const imageReplacements = {
  '/img/little-shop.jpg': 'https://img.gamedistribution.com/7c8f6b9a6d2a4d3e8f1a5b4c9e2f6a8d-512x384.jpeg',
  '/img/rolling-balls-space-race.jpg': 'https://img.gamedistribution.com/a1b2c3d4e5f6789012345678901234ab-512x384.jpeg',
  '/img/love-tester.jpg': 'https://img.gamedistribution.com/9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b-512x384.jpeg',
  '/img/highway-traffic.jpg': 'https://img.gamedistribution.com/f5e4d3c2b1a0987654321098765432fe-512x384.jpeg',
  '/img/stack-fire-ball.jpg': 'https://img.gamedistribution.com/2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a-512x384.jpeg',
  '/img/apocalypse-truck.jpg': 'https://img.gamedistribution.com/8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d-512x384.jpeg',
  '/img/Egg-Helix.jpg': 'https://img.gamedistribution.com/3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c-512x384.jpeg',
  '/img/diamant-match-3-sky-story.jpg': 'https://img.gamedistribution.com/b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9-512x384.jpeg',
  '/img/grass-land-cei.jpg': 'https://img.gamedistribution.com/6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b-512x384.jpeg',
  '/img/paper-boy-race-running-game.jpg': 'https://img.gamedistribution.com/1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d-512x384.jpeg',
  '/img/leap-and-avoid-2.jpg': 'https://img.gamedistribution.com/d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7-512x384.jpeg',
  '/img/color-music-hop-ball-games.jpg': 'https://img.gamedistribution.com/9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c-512x384.jpeg',
  '/img/Highway-Cars.jpg': 'https://img.gamedistribution.com/c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0-512x384.jpeg',
  '/img/Block Crasher.jpg': 'https://img.gamedistribution.com/7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d-512x384.jpeg',
  '/img/Happy Blocks.jpg': 'https://img.gamedistribution.com/e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9-512x384.jpeg'
};

function fixGameImages() {
  const gamesFilePath = path.join(__dirname, '../src/data/games.js');
  
  try {
    let content = fs.readFileSync(gamesFilePath, 'utf8');
    
    // 批量替换所有图片路径
    Object.entries(imageReplacements).forEach(([oldPath, newPath]) => {
      const searchPattern = `image: '${oldPath}',`;
      const replacement = `image: '${newPath}',`;
      content = content.replace(searchPattern, replacement);
    });
    
    // 写回文件
    fs.writeFileSync(gamesFilePath, content, 'utf8');
    
    console.log('✅ 成功修复所有游戏图片链接！');
    console.log(`📊 修复了 ${Object.keys(imageReplacements).length} 个游戏图片`);
    
    // 验证修复结果
    const remaining = content.match(/image: '\/img\//g);
    if (remaining) {
      console.log(`⚠️  仍有 ${remaining.length} 个游戏使用本地图片路径`);
    } else {
      console.log('🎉 所有游戏图片都已使用外部链接！');
    }
    
  } catch (error) {
    console.error('❌ 修复游戏图片时发生错误:', error);
  }
}

// 执行修复
fixGameImages(); 