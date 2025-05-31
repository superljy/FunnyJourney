# 自动同步脚本 - PowerShell版本
# 使用方法: .\auto-sync.ps1 "提交信息"

# 设置编码以正确显示中文
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [Console]::OutputEncoding

param(
    [string]$CommitMessage = "Auto-sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "🔄 开始自动同步..." -ForegroundColor Green

# 1. 检查是否有远程仓库
$remoteExists = git remote | Select-String "origin"
if (-not $remoteExists) {
    Write-Host "❌ 错误: 没有配置远程仓库 'origin'" -ForegroundColor Red
    Write-Host "请先运行: git remote add origin <你的GitHub仓库URL>" -ForegroundColor Yellow
    exit 1
}

# 2. 拉取最新更改
Write-Host "📥 拉取远程最新更改..." -ForegroundColor Blue
try {
    git fetch origin
    git pull origin main --rebase
    Write-Host "✅ 成功拉取最新更改" -ForegroundColor Green
} catch {
    Write-Host "⚠️  拉取时出现冲突，请手动解决" -ForegroundColor Yellow
}

# 3. 添加本地更改
Write-Host "📝 添加本地更改..." -ForegroundColor Blue
git add .

# 4. 检查是否有更改需要提交
$status = git status --porcelain
if ($status) {
    # 5. 提交更改
    Write-Host "💾 提交更改: $CommitMessage" -ForegroundColor Blue
    git commit -m $CommitMessage
    
    # 6. 推送到远程仓库
    Write-Host "📤 推送到远程仓库..." -ForegroundColor Blue
    git push origin main
    
    Write-Host "🎉 同步完成!" -ForegroundColor Green
} else {
    Write-Host "📋 没有需要提交的更改" -ForegroundColor Cyan
}

Write-Host "📊 当前状态:" -ForegroundColor Magenta
git status --short 