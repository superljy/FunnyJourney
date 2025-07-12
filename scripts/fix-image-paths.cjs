#!/usr/bin/env node

/**
 * 修复图片路径脚本
 * 将games.js中的绝对路径改为相对路径，确保在Vercel部署中正确工作
 */

const fs = require('fs');

console.log('🖼️ 开始修复图片路径...\n');

try {
  // 读取games.js文件
  const gamesPath = 'src/data/games.js';
  let content = fs.readFileSync(gamesPath, 'utf8');
  
  // 统计修复数量
  let fixCount = 0;
  
  // 替换绝对路径为相对路径
  // 将 '/img/' 替换为 './img/'
  content = content.replace(/image: '\/img\//g, (match) => {
    fixCount++;
    return "image: './img/";
  });
  
  // 同时检查是否有其他绝对路径引用
  content = content.replace(/image: "\/img\//g, (match) => {
    fixCount++;
    return 'image: "./img/';
  });
  
  // 写回文件
  fs.writeFileSync(gamesPath, content, 'utf8');
  
  console.log(`✅ 修复完成！共修复 ${fixCount} 个图片路径`);
  console.log('📝 将绝对路径 "/img/" 改为相对路径 "./img/"');
  console.log('🎯 现在图片在Vercel部署中应该正确加载\n');
  
  // 验证修复结果
  const updatedContent = fs.readFileSync(gamesPath, 'utf8');
  const absolutePaths = (updatedContent.match(/image: '\/img\//g) || []).length;
  const relativePaths = (updatedContent.match(/image: '\.\/img\//g) || []).length;
  
  console.log('📊 修复验证:');
  console.log(`   ❌ 剩余绝对路径: ${absolutePaths}`);
  console.log(`   ✅ 正确相对路径: ${relativePaths}`);
  
  if (absolutePaths === 0) {
    console.log('\n🎉 所有图片路径修复成功！');
  } else {
    console.log('\n⚠️ 仍有绝对路径需要手动检查');
  }

} catch (error) {
  console.error('❌ 修复失败:', error.message);
  process.exit(1);
} 