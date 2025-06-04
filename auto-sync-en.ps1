# Auto-sync script - PowerShell version
# Usage: .\auto-sync-en.ps1 "commit message"

# Set encoding for proper display
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [Console]::OutputEncoding

param(
    [string]$CommitMessage = "Auto-sync: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

Write-Host "🔄 Starting auto-sync..." -ForegroundColor Green

# 1. Check if remote repository exists
$remoteExists = git remote | Select-String "origin"
if (-not $remoteExists) {
    Write-Host "❌ Error: No remote repository 'origin' configured" -ForegroundColor Red
    Write-Host "Please run: git remote add origin <your-GitHub-repo-URL>" -ForegroundColor Yellow
    exit 1
}

# 2. Pull latest changes
Write-Host "📥 Pulling latest changes from remote..." -ForegroundColor Blue
try {
    git fetch origin
    git pull origin main --rebase
    Write-Host "✅ Successfully pulled latest changes" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Conflicts occurred while pulling, please resolve manually" -ForegroundColor Yellow
}

# 3. Add local changes
Write-Host "📝 Adding local changes..." -ForegroundColor Blue
git add .

# 4. Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    # 5. Commit changes
    Write-Host "💾 Committing changes: $CommitMessage" -ForegroundColor Blue
    git commit -m $CommitMessage
    
    # 6. Push to remote repository
    Write-Host "📤 Pushing to remote repository..." -ForegroundColor Blue
    git push origin main
    
    Write-Host "🎉 Sync completed!" -ForegroundColor Green
} else {
    Write-Host "📋 No changes to commit" -ForegroundColor Cyan
}

Write-Host "📊 Current status:" -ForegroundColor Magenta
git status --short 