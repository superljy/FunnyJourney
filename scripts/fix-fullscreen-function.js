import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 游戏文件夹路径
const gamesDir = path.join(__dirname, '../games');

// 新的全屏功能JavaScript代码
const newFullscreenFunction = `
        // Improved fullscreen functionality
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

async function fixFullscreenFunction() {
    console.log('🔧 开始修复游戏HTML文件中的全屏功能...\n');
    
    try {
        // 读取所有游戏HTML文件
        const files = fs.readdirSync(gamesDir).filter(file => file.endsWith('.html'));
        
        let totalFiles = 0;
        let modifiedFiles = 0;
        
        for (const file of files) {
            const filePath = path.join(gamesDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            // 查找并替换全屏功能代码
            const oldFunctionRegex = /\/\/ Fullscreen functionality[\s\S]*?(?=\/\/ .*|<\/script>|$)/g;
            const fullscreenChangeRegex = /\/\/ Handle fullscreen change events[\s\S]*?(?=\/\/ .*|<\/script>|$)/g;
            
            // 检查是否包含旧的全屏功能
            if (content.includes('// Fullscreen functionality') || content.includes('toggleFullscreen')) {
                // 替换旧的全屏功能代码
                content = content.replace(oldFunctionRegex, newFullscreenFunction.trim());
                content = content.replace(fullscreenChangeRegex, '');
                
                // 如果没有找到旧代码但有toggleFullscreen函数，则替换整个函数
                if (content.includes('function toggleFullscreen()')) {
                    content = content.replace(
                        /function toggleFullscreen\(\)[\s\S]*?(?=function|\s*\/\/|<\/script>|$)/g,
                        newFullscreenFunction.trim() + '\n\n        '
                    );
                }
                
                // 保存修改后的文件
                fs.writeFileSync(filePath, content, 'utf8');
                modifiedFiles++;
                console.log(`  ✅ ${file}: 全屏功能已更新`);
            }
            
            totalFiles++;
        }
        
        console.log('\n🎉 全屏功能修复完成！');
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
fixFullscreenFunction(); 