/**
 * 新增游戏图片下载和配置脚本
 * 为5个新增游戏下载图片到public/img目录并更新配置
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 新增游戏图片映射（从外部链接改为本地路径）
const newGameImages = {
  'flappy-bird': {
    currentUrl: 'https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/screenshot.png',
    localPath: '/img/flappy-bird.jpg',
    downloadUrl: 'https://raw.githubusercontent.com/samuelcust/flappy-bird-assets/master/screenshot.png'
  },
  'neon-slither-sim': {
    currentUrl: 'https://cdn.gamemonetize.com/3v2o9i34ywzfynh7r3hzlg2jt2oejqmp/512x384.jpg',
    localPath: '/img/neon-slither-sim.jpg',
    downloadUrl: 'https://cdn.gamemonetize.com/3v2o9i34ywzfynh7r3hzlg2jt2oejqmp/512x384.jpg'
  },
  'motorbike-stunt-simulator': {
    currentUrl: 'https://img.gamedistribution.com/f96c1c9bb4c5428eb4b42c9b16b76c13-512x384.jpeg',
    localPath: '/img/motorbike-stunt-simulator.jpg',
    downloadUrl: 'https://img.gamedistribution.com/f96c1c9bb4c5428eb4b42c9b16b76c13-512x384.jpeg'
  },
  'mega-soccer': {
    currentUrl: 'https://img.gamedistribution.com/ea9d1d47d16f42cab9d42b2cb7aa2c70-512x384.jpeg',
    localPath: '/img/mega-soccer.jpg',
    downloadUrl: 'https://img.gamedistribution.com/ea9d1d47d16f42cab9d42b2cb7aa2c70-512x384.jpeg'
  },
  'julie-beauty-salon': {
    currentUrl: 'https://img.gamedistribution.com/16e23b9f775241a5870ba6f91db84f7c-512x384.jpeg',
    localPath: '/img/julie-beauty-salon.jpg',
    downloadUrl: 'https://img.gamedistribution.com/16e23b9f775241a5870ba6f91db84f7c-512x384.jpeg'
  }
};

// 下载图片的函数（需要网络请求库）
async function downloadImage(url, filename) {
  try {
    // 这里需要实际的下载实现
    console.log(`📥 需要下载: ${url} -> public/img/${filename}`);
    console.log(`💡 请手动下载图片或使用curl命令:`);
    console.log(`   curl -o "public/img/${filename}" "${url}"`);
    return false; // 表示需要手动下载
  } catch (error) {
    console.error(`❌ 下载 ${filename} 失败:`, error);
    return false;
  }
}

function updateNewGameImages() {
  const gamesFilePath = path.join(__dirname, '../src/data/games.js');
  
  try {
    let content = fs.readFileSync(gamesFilePath, 'utf8');
    let hasChanges = false;
    
    console.log('🔄 处理新增游戏图片...\n');
    
    // 为每个新增游戏处理图片
    Object.entries(newGameImages).forEach(([gameId, imageInfo]) => {
      const searchPattern = `image: '${imageInfo.currentUrl}',`;
      const replacement = `image: '${imageInfo.localPath}',`;
      
      if (content.includes(searchPattern)) {
        console.log(`🎮 处理游戏: ${gameId}`);
        console.log(`📥 下载链接: ${imageInfo.downloadUrl}`);
        console.log(`📁 本地路径: public${imageInfo.localPath}`);
        console.log(`🔗 配置更新: ${imageInfo.currentUrl} -> ${imageInfo.localPath}\n`);
        
        // 更新配置文件
        content = content.replace(searchPattern, replacement);
        hasChanges = true;
      }
    });
    
    if (hasChanges) {
      // 写回文件
      fs.writeFileSync(gamesFilePath, content, 'utf8');
      console.log('✅ 配置文件已更新！');
    }
    
    // 生成下载命令
    console.log('\n📋 手动下载命令:');
    console.log('请在项目根目录执行以下命令下载图片:\n');
    
    Object.entries(newGameImages).forEach(([gameId, imageInfo]) => {
      const filename = path.basename(imageInfo.localPath);
      console.log(`curl -o "public/img/${filename}" "${imageInfo.downloadUrl}"`);
    });
    
    console.log('\n或者使用PowerShell:');
    Object.entries(newGameImages).forEach(([gameId, imageInfo]) => {
      const filename = path.basename(imageInfo.localPath);
      console.log(`Invoke-WebRequest -Uri "${imageInfo.downloadUrl}" -OutFile "public/img/${filename}"`);
    });
    
    // 验证结果
    const localImages = content.match(/image: '\/img\//g);
    const externalImages = content.match(/image: 'https:\/\//g);
    
    console.log('\n📊 图片配置统计:');
    console.log(`🏠 本地图片引用: ${localImages ? localImages.length : 0} 个`);
    console.log(`🌐 外部图片引用: ${externalImages ? externalImages.length : 0} 个`);
    
  } catch (error) {
    console.error('❌ 处理新增游戏图片时发生错误:', error);
  }
}

// 检查public/img目录
function checkPublicImgDirectory() {
  const publicImgPath = path.join(__dirname, '../public/img');
  
  try {
    const files = fs.readdirSync(publicImgPath);
    console.log(`📁 public/img 目录现有 ${files.length} 个文件`);
    
    // 检查新增游戏图片是否存在
    Object.entries(newGameImages).forEach(([gameId, imageInfo]) => {
      const filename = path.basename(imageInfo.localPath);
      const exists = files.includes(filename);
      console.log(`${exists ? '✅' : '❌'} ${filename} - ${exists ? '已存在' : '需要下载'}`);
    });
    
  } catch (error) {
    console.error('❌ 检查public/img目录失败:', error);
  }
}

// 执行处理
console.log('🎮 新增游戏图片处理工具\n');
checkPublicImgDirectory();
console.log('\n' + '='.repeat(50) + '\n');
updateNewGameImages(); 