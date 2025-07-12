#!/usr/bin/env node

/**
 * 强制修复图片路径脚本
 * 手动替换所有已知的图片路径
 */

const fs = require('fs');

console.log('🖼️ 强制修复图片路径...\n');

try {
  const gamesPath = 'src/data/games.js';
  let content = fs.readFileSync(gamesPath, 'utf8');
  
  console.log('📝 原始内容预览:');
  console.log(content.substring(0, 500) + '...');
  
  // 定义所有需要修复的图片路径
  const imageReplacements = [
    { old: "image: '/img/Monster-survivors.jpg'", new: "image: './img/Monster-survivors.jpg'" },
    { old: "image: '/img/solitaire.jpg'", new: "image: './img/solitaire.jpg'" },
    { old: "image: '/img/loot-island-treasure-digger.jpg'", new: "image: './img/loot-island-treasure-digger.jpg'" },
    { old: "image: '/img/little-shop.jpg'", new: "image: './img/little-shop.jpg'" },
    { old: "image: '/img/rolling-balls-space-race.jpg'", new: "image: './img/rolling-balls-space-race.jpg'" },
    { old: "image: '/img/love-tester.jpg'", new: "image: './img/love-tester.jpg'" },
    { old: "image: '/img/highway-traffic.jpg'", new: "image: './img/highway-traffic.jpg'" },
    { old: "image: '/img/stack-fire-ball.jpg'", new: "image: './img/stack-fire-ball.jpg'" },
    { old: "image: '/img/apocalypse-truck.jpg'", new: "image: './img/apocalypse-truck.jpg'" },
    { old: "image: '/img/Egg-Helix.jpg'", new: "image: './img/Egg-Helix.jpg'" },
    { old: "image: '/img/diamant-match-3-sky-story.jpg'", new: "image: './img/diamant-match-3-sky-story.jpg'" },
    { old: "image: '/img/grass-land-cei.jpg'", new: "image: './img/grass-land-cei.jpg'" },
    { old: "image: '/img/paper-boy-race-running-game.jpg'", new: "image: './img/paper-boy-race-running-game.jpg'" },
    { old: "image: '/img/leap-and-avoid-2.jpg'", new: "image: './img/leap-and-avoid-2.jpg'" },
    { old: "image: '/img/color-music-hop-ball-games.jpg'", new: "image: './img/color-music-hop-ball-games.jpg'" },
    { old: "image: '/img/Cookie-Clicker-Pro-Game.jpg'", new: "image: './img/Cookie-Clicker-Pro-Game.jpg'" },
    { old: "image: '/img/Capybara-Clicker-Pro.jpg'", new: "image: './img/Capybara-Clicker-Pro.jpg'" },
    { old: "image: '/img/Poop-Clicker.jpg'", new: "image: './img/Poop-Clicker.jpg'" },
    { old: "image: '/img/Highway-Cars.jpg'", new: "image: './img/Highway-Cars.jpg'" },
    { old: "image: '/img/Block Crasher.jpg'", new: "image: './img/Block Crasher.jpg'" },
    { old: "image: '/img/Happy Blocks.jpg'", new: "image: './img/Happy Blocks.jpg'" },
    { old: "image: '/img/flappy-bird.jpg'", new: "image: './img/flappy-bird.jpg'" },
    { old: "image: '/img/neon_slither_sim.jpg'", new: "image: './img/neon_slither_sim.jpg'" },
    { old: "image: '/img/motorbike_stunt_simulator.jpg'", new: "image: './img/motorbike_stunt_simulator.jpg'" },
    { old: "image: '/img/mega-soccer-game.jpg'", new: "image: './img/mega-soccer-game.jpg'" },
    { old: "image: '/img/Julie-Beauty-Salon.jpg'", new: "image: './img/Julie-Beauty-Salon.jpg'" }
  ];
  
  let fixCount = 0;
  
  // 执行所有替换
  imageReplacements.forEach(replacement => {
    if (content.includes(replacement.old)) {
      content = content.replace(replacement.old, replacement.new);
      fixCount++;
      console.log(`✅ 修复: ${replacement.old} -> ${replacement.new}`);
    }
  });
  
  // 通用正则替换（备用）
  const beforeRegex = content;
  content = content.replace(/image: '\/img\//g, "image: './img/");
  const regexCount = (beforeRegex.match(/image: '\/img\//g) || []).length;
  
  if (regexCount > 0) {
    console.log(`🔧 正则表达式额外修复: ${regexCount} 个路径`);
    fixCount += regexCount;
  }
  
  // 写回文件
  fs.writeFileSync(gamesPath, content, 'utf8');
  
  console.log(`\n🎉 修复完成！共修复 ${fixCount} 个图片路径`);
  
  // 验证结果
  const updatedContent = fs.readFileSync(gamesPath, 'utf8');
  const remaining = (updatedContent.match(/image: '\/img\//g) || []).length;
  const fixed = (updatedContent.match(/image: '\.\/img\//g) || []).length;
  
  console.log('\n📊 最终统计:');
  console.log(`   ✅ 已修复: ${fixed} 个相对路径`);
  console.log(`   ❌ 剩余: ${remaining} 个绝对路径`);
  
  if (remaining === 0) {
    console.log('\n🎯 所有图片路径已修复为相对路径！');
  }

} catch (error) {
  console.error('❌ 修复失败:', error.message);
  process.exit(1);
} 