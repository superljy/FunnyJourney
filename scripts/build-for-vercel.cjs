#!/usr/bin/env node

/**
 * Vercel部署构建脚本
 * 确保所有必要的文件都被正确包含在构建输出中
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 开始Vercel专用构建...\n');

try {
  // 1. 运行标准构建
  console.log('📦 执行标准构建...');
  execSync('npm run build', { stdio: 'inherit' });

  // 2. 确保games目录存在于dist中
  const gamesDistPath = path.join('dist', 'games');
  if (!fs.existsSync(gamesDistPath)) {
    console.log('📁 复制games目录到dist...');
    execSync('xcopy /E /I /Y games dist\\games', { stdio: 'inherit' });
  }

  // 3. 确保其他必要文件存在
  const filesToCopy = [
    { src: 'robots.txt', dest: 'dist/robots.txt' },
    { src: 'sitemap.xml', dest: 'dist/sitemap.xml' },
    { src: 'BingSiteAuth.xml', dest: 'dist/BingSiteAuth.xml' },
    { src: 'ads.txt', dest: 'dist/ads.txt' }
  ];

  filesToCopy.forEach(({ src, dest }) => {
    if (fs.existsSync(src)) {
      console.log(`📄 复制 ${src} -> ${dest}`);
      fs.copyFileSync(src, dest);
    }
  });

  // 4. 验证关键文件
  const requiredFiles = [
    'dist/index.html',
    'dist/games',
    'dist/img',
    'dist/robots.txt',
    'dist/sitemap.xml'
  ];

  console.log('\n🔍 验证构建输出...');
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} - 存在`);
    } else {
      console.log(`❌ ${file} - 缺失`);
      process.exit(1);
    }
  });

  console.log('\n🎉 Vercel构建完成！');
  console.log('📁 输出目录: dist/');
  console.log('🌐 现在可以部署到Vercel了！');

} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
} 