import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 游戏文件夹路径
const gamesDir = path.join(__dirname, '../games');

// 正确的全屏功能JavaScript代码
const correctFullscreenCode = `        // Improved fullscreen functionality
        function toggleFullscreen() {
            const gameContainer = document.getElementById('gameContainer');
            const gameIframe = gameContainer.querySelector('.game-iframe');
            
            if (!document.fullscreenElement) {
                // 进入全屏
                gameContainer.requestFullscreen().then(() => {
                    gameContainer.classList.add('fullscreen-active');
                    console.log('Entered fullscreen mode');
                }).catch(err => {
                    console.log('Error attempting to enable fullscreen:', err);
                });
            } else {
                // 退出全屏
                document.exitFullscreen().then(() => {
                    gameContainer.classList.remove('fullscreen-active');
                    console.log('Exited fullscreen mode');
                });
            }
        }

        // Handle fullscreen change events
        document.addEventListener('fullscreenchange', function() {
            const gameContainer = document.getElementById('gameContainer');
            const gameIframe = gameContainer.querySelector('.game-iframe');
            
            if (!document.fullscreenElement) {
                // 确保退出全屏时移除类名和内联样式
                gameContainer.classList.remove('fullscreen-active');
                gameContainer.style.cssText = '';
                if (gameIframe) {
                    gameIframe.style.cssText = '';
                }
                console.log('Fullscreen change: exited');
            } else {
                console.log('Fullscreen change: entered');
            }
        });

        // Handle escape key for fullscreen exit
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && document.fullscreenElement) {
                const gameContainer = document.getElementById('gameContainer');
                gameContainer.classList.remove('fullscreen-active');
            }
        });`;

async function fixFullscreenClean() {
    console.log('🔧 开始清理并修复游戏HTML文件中的全屏功能...\n');
    
    try {
        // 读取所有游戏HTML文件
        const files = fs.readdirSync(gamesDir).filter(file => file.endsWith('.html'));
        
        let totalFiles = 0;
        let modifiedFiles = 0;
        
        for (const file of files) {
            const filePath = path.join(gamesDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // 查找script标签的开始和结束位置
            const scriptStartIndex = content.lastIndexOf('<script>');
            const scriptEndIndex = content.lastIndexOf('</script>');
            
            if (scriptStartIndex !== -1 && scriptEndIndex !== -1) {
                // 提取script标签的内容
                const beforeScript = content.substring(0, scriptStartIndex + 8); // include '<script>'
                const afterScript = content.substring(scriptEndIndex);
                const scriptContent = content.substring(scriptStartIndex + 8, scriptEndIndex);
                
                // 清理并重构script内容
                let cleanedScript = scriptContent;
                
                // 移除所有旧的全屏相关代码
                cleanedScript = cleanedScript.replace(/\/\/ (?:Fullscreen functionality|Improved fullscreen functionality)[\s\S]*?(?=\/\/ \w|function \w|\s*\/\/|$)/g, '');
                cleanedScript = cleanedScript.replace(/function toggleFullscreen\(\)[\s\S]*?(?=function \w|\s*\/\/|$)/g, '');
                cleanedScript = cleanedScript.replace(/\/\/ Handle fullscreen change events[\s\S]*?(?=function \w|\s*\/\/|$)/g, '');
                cleanedScript = cleanedScript.replace(/document\.addEventListener\('fullscreenchange'[\s\S]*?}\);/g, '');
                cleanedScript = cleanedScript.replace(/document\.addEventListener\('keydown'[\s\S]*?}\);/g, '');
                
                // 移除重复的代码片段
                cleanedScript = cleanedScript.replace(/\/\/ 进入全屏[\s\S]*?}\);/g, '');
                cleanedScript = cleanedScript.replace(/\/\/ 确保退出全屏时移除类名和内联样式[\s\S]*?}\);/g, '');
                
                // 清理多余的空行
                cleanedScript = cleanedScript.replace(/\n{3,}/g, '\n\n');
                
                // 在loadRelatedGames函数之前插入正确的全屏代码
                const loadRelatedGamesIndex = cleanedScript.indexOf('// Load related games');
                if (loadRelatedGamesIndex !== -1) {
                    const beforeLoadRelated = cleanedScript.substring(0, loadRelatedGamesIndex);
                    const afterLoadRelated = cleanedScript.substring(loadRelatedGamesIndex);
                    cleanedScript = beforeLoadRelated + correctFullscreenCode + '\n\n        ' + afterLoadRelated;
                } else {
                    // 如果没找到loadRelatedGames，就在最后添加
                    cleanedScript = cleanedScript.trim() + '\n\n' + correctFullscreenCode + '\n';
                }
                
                // 重新组合完整的HTML内容
                const newContent = beforeScript + cleanedScript + afterScript;
                
                // 检查是否有实际修改
                if (newContent !== content) {
                    fs.writeFileSync(filePath, newContent, 'utf8');
                    modifiedFiles++;
                    console.log(`  ✅ ${file}: 全屏功能已清理并更新`);
                }
            }
            
            totalFiles++;
        }
        
        console.log('\n🎉 全屏功能清理修复完成！');
        console.log(`📊 统计信息：`);
        console.log(`  - 扫描文件: ${totalFiles} 个`);
        console.log(`  - 修改文件: ${modifiedFiles} 个`);
        console.log(`  - 成功率: ${((modifiedFiles / Math.max(totalFiles, 1)) * 100).toFixed(1)}%`);
        
    } catch (error) {
        console.error('❌ 修复过程中出现错误:', error);
        process.exit(1);
    }
}

// 运行修复
fixFullscreenClean(); 