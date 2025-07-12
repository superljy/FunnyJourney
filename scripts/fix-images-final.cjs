#!/usr/bin/env node

/**
 * 最终图片路径修复脚本
 * 改回绝对路径并确保Vercel部署正确
 */

const fs = require('fs');

console.log('🖼️ 最终图片路径修复...\n');

try {
  const gamesPath = 'src/data/games.js';
  let content = fs.readFileSync(gamesPath, 'utf8');
  
  // 将相对路径改回绝对路径（Vercel推荐做法）
  content = content.replace(/image: '\.\/img\//g, "image: '/img/");
  
  fs.writeFileSync(gamesPath, content, 'utf8');
  
  // 统计结果
  const updatedContent = fs.readFileSync(gamesPath, 'utf8');
  const absolutePaths = (updatedContent.match(/image: '\/img\//g) || []).length;
  const relativePaths = (updatedContent.match(/image: '\.\/img\//g) || []).length;
  
  console.log('📊 修复结果:');
  console.log(`   ✅ 绝对路径: ${absolutePaths} 个`);
  console.log(`   ❌ 相对路径: ${relativePaths} 个`);
  console.log('\n🎯 原因: Vercel部署推荐使用绝对路径 /img/ 而不是 ./img/');
  console.log('💡 确保public/img目录正确映射到/img/路径');

} catch (error) {
  console.error('❌ 修复失败:', error.message);
} 