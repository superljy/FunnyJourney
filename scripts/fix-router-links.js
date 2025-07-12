import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 游戏文件夹路径
const gamesDir = path.join(__dirname, '../games');

// 链接映射配置
const linkMappings = [
  // 首页链接
  {
    from: 'href="../index.html"',
    to: 'href="../index-vue.html"',
    description: '修复首页链接'
  },
  // 游戏列表链接
  {
    from: 'href="index.html"',
    to: 'href="../index-vue.html#/games"',
    description: '修复游戏列表链接'
  },
  // 关于页面链接
  {
    from: 'href="../about/index.html"',
    to: 'href="../index-vue.html#/about"',
    description: '修复关于页面链接'
  },
  // 隐私政策链接
  {
    from: 'href="../about/index.html#privacy"',
    to: 'href="../index-vue.html#/about#privacy"',
    description: '修复隐私政策链接'
  },
  // 服务条款链接
  {
    from: 'href="../about/index.html#terms"',
    to: 'href="../index-vue.html#/about#terms"',
    description: '修复服务条款链接'
  },
  // JavaScript中的首页跳转
  {
    from: "window.location.href='index.html'",
    to: "window.location.href='../index-vue.html#/games'",
    description: '修复JS中的游戏列表跳转'
  },
  {
    from: "window.location.href = '../index.html'",
    to: "window.location.href = '../index-vue.html'",
    description: '修复JS中的首页跳转'
  },
  {
    from: "window.location.href = 'index.html'",
    to: "window.location.href = '../index-vue.html#/games'",
    description: '修复JS中的游戏列表跳转'
  },
  {
    from: "onclick=\"window.location.href='index.html'\"",
    to: "onclick=\"window.location.href='../index-vue.html#/games'\"",
    description: '修复按钮中的游戏列表跳转'
  }
];

async function fixRouterLinks() {
  console.log('🔧 开始修复游戏HTML文件中的路由链接...\n');
  
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
    
    console.log('\n🎉 路由链接修复完成！');
    console.log(`📊 统计信息：`);
    console.log(`  - 扫描文件: ${totalFiles} 个`);
    console.log(`  - 修改文件: ${modifiedFiles} 个`);
    console.log(`  - 总替换数: ${totalReplacements} 处`);
    console.log(`  - 成功率: ${((modifiedFiles / totalFiles) * 100).toFixed(1)}%`);
    
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
fixRouterLinks(); 