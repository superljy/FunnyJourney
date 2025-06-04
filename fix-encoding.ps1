# PowerShell编码修复脚本
# 解决中文乱码问题

Write-Host "🔧 正在修复PowerShell编码设置..." -ForegroundColor Green

# 1. 设置控制台代码页为UTF-8
Write-Host "📝 设置控制台代码页为UTF-8..." -ForegroundColor Blue
chcp 65001 | Out-Null

# 2. 设置PowerShell输出编码
Write-Host "🔤 设置PowerShell输出编码..." -ForegroundColor Blue
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [Console]::OutputEncoding

# 3. 设置Git配置支持UTF-8
Write-Host "⚙️  配置Git支持UTF-8..." -ForegroundColor Blue
git config --global core.quotepath false
git config --global gui.encoding utf-8
git config --global i18n.commit.encoding utf-8
git config --global i18n.logoutputencoding utf-8

Write-Host "✅ 编码修复完成!" -ForegroundColor Green
Write-Host "💡 建议: 如果问题仍然存在，请尝试以下方法:" -ForegroundColor Cyan
Write-Host "   1. 重启PowerShell窗口" -ForegroundColor Yellow
Write-Host "   2. 使用Windows Terminal而不是传统的PowerShell" -ForegroundColor Yellow
Write-Host "   3. 确保文件保存为UTF-8编码" -ForegroundColor Yellow

# 测试显示
Write-Host ""
Write-Host "🧪 测试中文显示:" -ForegroundColor Magenta
Write-Host "   Hello 世界 🌍" -ForegroundColor White
Write-Host "   测试 Test 🚀" -ForegroundColor White
Write-Host "   如果上面的中文和emoji正常显示，说明修复成功！" -ForegroundColor Green 