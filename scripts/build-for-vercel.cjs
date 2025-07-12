#!/usr/bin/env node

/**
 * Vercel部署构建脚本
 * 确保所有必要的文件都被正确包含在构建输出中
 * 跨平台兼容 (Windows/Linux/macOS)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 递归复制目录
 * @param {string} src 源目录
 * @param {string} dest 目标目录
 */
function copyDirectoryRecursive(src, dest) {
  // 确保目标目录存在
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // 读取源目录
  const items = fs.readdirSync(src);

  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    const stat = fs.statSync(srcPath);

    if (stat.isDirectory()) {
      // 递归复制子目录
      copyDirectoryRecursive(srcPath, destPath);
    } else {
      // 复制文件
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

/**
 * 等待指定毫秒数
 * @param {number} ms 毫秒数
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

console.log('🚀 开始Vercel专用构建...\n');

try {
  // 1. 运行标准构建
  console.log('📦 执行标准构建...');
  execSync('npm run build', { stdio: 'inherit' });

  // 等待1秒确保构建完全完成
  console.log('⏳ 等待构建完成...');
  await sleep(1000);

  // 2. 检查public/img目录
  console.log('🔍 检查源文件...');
  if (fs.existsSync('public/img')) {
    const imgFiles = fs.readdirSync('public/img').filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));
    console.log(`📷 发现 ${imgFiles.length} 个图片文件在 public/img/`);
  } else {
    console.log('❌ public/img 目录不存在');
  }

  // 3. 确保games目录存在于dist中
  const gamesDistPath = path.join('dist', 'games');
  if (!fs.existsSync(gamesDistPath)) {
    console.log('📁 复制games目录到dist...');
    copyDirectoryRecursive('games', gamesDistPath);
    console.log('✅ games目录复制完成');
  }

  // 4. 手动检查并复制img目录（如果Vite没有正确复制）
  const imgDistPath = path.join('dist', 'img');
  if (!fs.existsSync(imgDistPath)) {
    console.log('⚠️  Vite没有复制img目录，手动复制...');
    if (fs.existsSync('public/img')) {
      copyDirectoryRecursive('public/img', imgDistPath);
      console.log('✅ img目录手动复制完成');
    } else {
      console.log('❌ 源img目录不存在');
    }
  } else {
    const distImgFiles = fs.readdirSync(imgDistPath).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));
    console.log(`✅ dist/img已存在，包含 ${distImgFiles.length} 个图片文件`);
  }

  // 5. 确保其他必要文件存在
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

  // 6. 详细验证关键文件
  const requiredFiles = [
    'dist/index.html',
    'dist/games',
    'dist/img',
    'dist/robots.txt',
    'dist/sitemap.xml'
  ];

  console.log('\n🔍 验证构建输出...');
  let allFilesExist = true;
  
  requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file} - 存在`);
      
      // 如果是目录，显示内容统计
      if (fs.statSync(file).isDirectory()) {
        const files = fs.readdirSync(file);
        console.log(`   └─ 包含 ${files.length} 个项目`);
        
        // 特别检查img目录的图片文件
        if (file === 'dist/img') {
          const imgFiles = files.filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));
          console.log(`   └─ 其中 ${imgFiles.length} 个图片文件`);
        }
      }
    } else {
      console.log(`❌ ${file} - 缺失`);
      allFilesExist = false;
    }
  });

  if (!allFilesExist) {
    console.log('\n❌ 部分必需文件缺失，构建失败');
    process.exit(1);
  }

  console.log('\n🎉 Vercel构建完成！');
  console.log('📁 输出目录: dist/');
  console.log('🌐 现在可以部署到Vercel了！');

} catch (error) {
  console.error('❌ 构建失败:', error.message);
  process.exit(1);
} 