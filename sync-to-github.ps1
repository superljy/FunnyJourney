# PowerShell script to sync FunnyJourney project to GitHub
# 项目同步到GitHub的脚本

Write-Host "🚀 开始同步 FunnyJourney 项目到 GitHub..." -ForegroundColor Green

# 检查Git是否可用
try {
    $gitVersion = & git --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Git not found"
    }
    Write-Host "✅ Git 已安装: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ 错误: Git 未安装或不在PATH中" -ForegroundColor Red
    Write-Host "请从 https://git-scm.com/download/win 下载并安装 Git" -ForegroundColor Yellow
    Read-Host "按Enter键退出"
    exit 1
}

# 设置仓库地址
$repoUrl = "git@github.com:superljy/FunnyJourney.git"
$repoName = "FunnyJourney"

Write-Host "📋 仓库地址: $repoUrl" -ForegroundColor Cyan

# 检查是否已经是Git仓库
if (!(Test-Path ".git")) {
    Write-Host "📁 初始化Git仓库..." -ForegroundColor Yellow
    git init
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Git初始化失败" -ForegroundColor Red
        Read-Host "按Enter键退出"
        exit 1
    }
} else {
    Write-Host "✅ 已存在Git仓库" -ForegroundColor Green
}

# 配置Git用户信息（如果还没有配置）
$gitUserName = git config user.name 2>$null
$gitUserEmail = git config user.email 2>$null

if ([string]::IsNullOrEmpty($gitUserName)) {
    Write-Host "⚙️ 配置Git用户名..." -ForegroundColor Yellow
    $userName = Read-Host "请输入您的Git用户名"
    git config user.name "$userName"
}

if ([string]::IsNullOrEmpty($gitUserEmail)) {
    Write-Host "⚙️ 配置Git邮箱..." -ForegroundColor Yellow
    $userEmail = Read-Host "请输入您的Git邮箱"
    git config user.email "$userEmail"
}

# 添加远程仓库
Write-Host "🔗 配置远程仓库..." -ForegroundColor Yellow
git remote remove origin 2>$null  # 删除可能存在的origin
git remote add origin $repoUrl

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 添加远程仓库失败" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

# 检查工作目录状态
Write-Host "📊 检查文件状态..." -ForegroundColor Yellow
git status --porcelain

# 添加所有文件到暂存区（.gitignore会自动排除不需要的文件）
Write-Host "➕ 添加文件到暂存区..." -ForegroundColor Yellow
git add .

# 显示将要提交的文件
Write-Host "📋 将要提交的文件:" -ForegroundColor Cyan
git diff --cached --name-only

# 检查是否有文件要提交
$stagedFiles = git diff --cached --name-only
if ([string]::IsNullOrEmpty($stagedFiles)) {
    Write-Host "ℹ️ 没有文件需要提交" -ForegroundColor Blue
    Read-Host "按Enter键退出"
    exit 0
}

# 提交更改
$commitMessage = "SEO optimization: English localization and enhanced features - Converted site language to English for global reach - Updated meta tags, titles, and descriptions - Enhanced structured data (JSON-LD) - Created comprehensive sitemap.xml - Configured robots.txt for search engines - Added SEO monitoring tools - Optimized for Google Ads performance - Excluded unnecessary .md files via .gitignore Ready for international traffic and better Google rankings!"

Write-Host "💾 提交更改..." -ForegroundColor Yellow
git commit -m "$commitMessage"

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 提交失败" -ForegroundColor Red
    Read-Host "按Enter键退出"
    exit 1
}

# 推送到GitHub
Write-Host "🚀 推送到GitHub..." -ForegroundColor Yellow
Write-Host "注意: 如果这是第一次推送，可能需要配置SSH密钥" -ForegroundColor Yellow

git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ 推送失败，尝试使用master分支..." -ForegroundColor Yellow
    git branch -M main
    git push -u origin main
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 推送失败" -ForegroundColor Red
        Write-Host "可能的原因:" -ForegroundColor Yellow
        Write-Host "1. SSH密钥未配置" -ForegroundColor White
        Write-Host "2. 仓库访问权限问题" -ForegroundColor White
        Write-Host "3. 网络连接问题" -ForegroundColor White
        Write-Host "" -ForegroundColor White
        Write-Host "请检查SSH配置: https://docs.github.com/en/authentication/connecting-to-github-with-ssh" -ForegroundColor Cyan
        Read-Host "按Enter键退出"
        exit 1
    }
}

Write-Host "🎉 项目成功同步到GitHub!" -ForegroundColor Green
Write-Host "🔗 访问您的仓库: https://github.com/superljy/FunnyJourney" -ForegroundColor Cyan
Write-Host "" -ForegroundColor White
Write-Host "📋 同步内容摘要:" -ForegroundColor Yellow
Write-Host "✅ 网站英文化完成" -ForegroundColor Green
Write-Host "✅ SEO优化文件已添加" -ForegroundColor Green  
Write-Host "✅ robots.txt 和 sitemap.xml 已创建" -ForegroundColor Green
Write-Host "✅ 排除了不必要的.md文件" -ForegroundColor Green
Write-Host "" -ForegroundColor White
Write-Host "🎯 下一步建议:" -ForegroundColor Yellow
Write-Host "1. 部署网站到您的服务器" -ForegroundColor White
Write-Host "2. 提交sitemap到Google Search Console" -ForegroundColor White
Write-Host "3. 开始Google Ads投放" -ForegroundColor White

Read-Host "按Enter键退出" 