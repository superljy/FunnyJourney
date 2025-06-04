# GitHub配置脚本
# 使用方法: .\setup-github.ps1

# 设置编码以正确显示中文
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [Console]::OutputEncoding

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubRepoUrl,
    [string]$BranchName = "main"
)

Write-Host "🔧 配置GitHub仓库..." -ForegroundColor Green

# 1. 添加远程仓库
Write-Host "📡 添加远程仓库: $GitHubRepoUrl" -ForegroundColor Blue
git remote add origin $GitHubRepoUrl

# 2. 检查当前分支
$currentBranch = git branch --show-current
if ($currentBranch -ne $BranchName) {
    Write-Host "🔄 切换到分支: $BranchName" -ForegroundColor Blue
    try {
        git checkout -b $BranchName
    } catch {
        git checkout $BranchName
    }
}

# 3. 设置上游分支
Write-Host "⬆️  设置上游分支..." -ForegroundColor Blue
git push -u origin $BranchName

Write-Host "✅ GitHub仓库配置完成!" -ForegroundColor Green
Write-Host "现在你可以使用以下命令:" -ForegroundColor Cyan
Write-Host "  .\auto-sync.ps1 '你的提交信息'" -ForegroundColor Yellow
Write-Host "  .\quick-sync.ps1" -ForegroundColor Yellow 