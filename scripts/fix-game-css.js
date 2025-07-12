import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 游戏目录
const gamesDir = path.join(__dirname, '../games');

// 获取所有游戏HTML文件
const gameFiles = fs.readdirSync(gamesDir).filter(file => file.endsWith('.html') && file !== 'index.html');

console.log(`找到 ${gameFiles.length} 个游戏HTML文件`);

// CSS引用代码
const cssLink = `    <link rel="stylesheet" href="game-styles.css">`;

// 处理每个游戏HTML文件
gameFiles.forEach(file => {
    const filePath = path.join(gamesDir, file);
    
    try {
        // 读取文件内容
        let content = fs.readFileSync(filePath, 'utf8');
        
        // 检查是否已经包含CSS引用
        if (content.includes('game-styles.css')) {
            console.log(`✅ ${file} - 已包含CSS引用`);
            return;
        }
        
        // 找到head结束标签的位置
        const headEndIndex = content.indexOf('</head>');
        if (headEndIndex === -1) {
            console.log(`❌ ${file} - 未找到 </head> 标签`);
            return;
        }
        
        // 在head标签结束前插入CSS引用
        const beforeHead = content.substring(0, headEndIndex);
        const afterHead = content.substring(headEndIndex);
        
        // 检查是否有样式注释行，如果有就替换
        const styleCommentRegex = /\s*<!--\s*Add main stylesheet for consistent styling\s*-->/;
        
        if (styleCommentRegex.test(beforeHead)) {
            // 替换样式注释为实际的CSS引用
            content = content.replace(styleCommentRegex, `\n${cssLink}`);
            console.log(`🔄 ${file} - 替换样式注释为CSS引用`);
        } else {
            // 直接在head结束前添加CSS引用
            content = beforeHead + '\n' + cssLink + '\n' + afterHead;
            console.log(`➕ ${file} - 添加CSS引用`);
        }
        
        // 写回文件
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ ${file} - 修复完成`);
        
    } catch (error) {
        console.error(`❌ ${file} - 处理失败:`, error.message);
    }
});

console.log('\n🎉 游戏CSS修复完成！'); 