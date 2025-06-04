# 快速同步脚本 - 适用于日常开发
# 使用方法: .\quick-sync.ps1

# 设置编码以正确显示中文
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [Console]::OutputEncoding

Write-Host "⚡ 快速同步模式..." -ForegroundColor Cyan

# 拉取最新更改
git pull origin main

# 添加所有更改
git add .

# 检查是否有更改
$status = git status --porcelain
if ($status) {
    # 使用时间戳作为提交信息
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Quick sync: $timestamp"
    git push origin main
    Write-Host "✅ 快速同步完成!" -ForegroundColor Green
} else {
    Write-Host "📋 没有需要同步的更改" -ForegroundColor Yellow
}