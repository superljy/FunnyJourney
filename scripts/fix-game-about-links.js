import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 游戏文件夹路径
const gamesDir = path.join(__dirname, '../games');

// 链接修复映射配置
const linkMappings = [
  // 修复about页面链接 - 使用Vue Router的history模式路径
  {
    from: 'href="../index-vue.html#/about"',
    to: 'href="../about"',
    description: '修复About页面链接为history模式路由'
  },
  // 修复隐私政策链接
  {
    from: 'href="../index-vue.html#/about#privacy"',
    to: 'href="../about#privacy"',
    description: '修复隐私政策链接'
  },
  // 修复服务条款链接
  {
    from: 'href="../index-vue.html#/about#terms"',
    to: 'href="../about#terms"',
    description: '修复服务条款链接'
  },
  // 修复games链接
  {
    from: 'href="../index-vue.html#/games"',
    to: 'href="../games"',
    description: '修复游戏列表链接为history模式路由'
  }
];

async function fixAboutLinks() {
  console.log('🔧 开始修复游戏HTML文件中的About链接...\n');
  
  try {
    // 读取所有游戏HTML文件
    const files = fs.readdirSync(gamesDir).filter(file => file.endsWith('.html'));
    
    let totalFiles = 0;
    let modifiedFiles = 0;
    let totalReplacements = 0;
    
    for (const file of files) {
      const filePath = path.join(gamesDir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      let fileModified = false;
      let fileReplacements = 0;
      
      // 应用所有链接映射
      for (const mapping of linkMappings) {
        const beforeCount = (content.match(new RegExp(escapeRegExp(mapping.from), 'g')) || []).length;
        if (beforeCount > 0) {
          content = content.replace(new RegExp(escapeRegExp(mapping.from), 'g'), mapping.to);
          fileReplacements += beforeCount;
          fileModified = true;
          console.log(`  ✅ ${file}: ${mapping.description} (${beforeCount}处)`);
        }
      }
      
      // 如果文件被修改，则保存
      if (fileModified) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedFiles++;
        totalReplacements += fileReplacements;
        console.log(`  📝 ${file}: 已修改 ${fileReplacements} 处链接\n`);
      }
      
      totalFiles++;
    }
    
    console.log('\n🎉 About链接修复完成！');
    console.log(`📊 统计信息：`);
    console.log(`  - 扫描文件: ${totalFiles} 个`);
    console.log(`  - 修改文件: ${modifiedFiles} 个`);
    console.log(`  - 总替换数: ${totalReplacements} 处`);
    console.log(`  - 成功率: ${((modifiedFiles / Math.max(totalFiles, 1)) * 100).toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ 修复过程中出现错误:', error);
    process.exit(1);
  }
}

// 转义正则表达式特殊字符
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 运行修复
fixAboutLinks(); 