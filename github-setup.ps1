Write-Host "🚀 GITHUB SETUP FOR UNIDIGITAL" -ForegroundColor Cyan
Write-Host "===============================`n" -ForegroundColor Cyan

# Check location
Write-Host "📁 Current directory:" -ForegroundColor Yellow
pwd

# Check git status
Write-Host "`n🔍 Git status:" -ForegroundColor Yellow
git status --short

# Remove existing remote
Write-Host "`n🛠️  Removing old remote..." -ForegroundColor Yellow
git remote remove origin 2>$null
Write-Host "✅ Remote removed" -ForegroundColor Green

# Instructions
Write-Host "`n📋 MANUAL ACTION REQUIRED:" -ForegroundColor Red
Write-Host "1. Open browser to: https://github.com/new" -ForegroundColor White
Write-Host "2. Create repository:" -ForegroundColor White
Write-Host "   - Owner: Davidgwa1996" -ForegroundColor White
Write-Host "   - Name: unidigitalcom" -ForegroundColor White
Write-Host "   - Public: ✓" -ForegroundColor White
Write-Host "   - Initialize with README: ✗ (UNCHECK!)" -ForegroundColor White
Write-Host "   - Click 'Create repository'" -ForegroundColor White

Write-Host "`n⏳ Waiting for you to create the repo..." -ForegroundColor Yellow
pause

# After repo created
Write-Host "`n📤 Setting up remote..." -ForegroundColor Cyan
git remote add origin https://github.com/Davidgwa1996/unidigitalcom.git

Write-Host "`n🚀 Pushing code..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
    Write-Host "🌐 View at: https://github.com/Davidgwa1996/unidigitalcom" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Push failed. Common fixes:" -ForegroundColor Red
    Write-Host "1. Use GitHub token as password" -ForegroundColor White
    Write-Host "2. Check repo actually exists" -ForegroundColor White
    Write-Host "3. Try SSH: git@github.com:Davidgwa1996/unidigitalcom.git" -ForegroundColor White
}

Write-Host "`n📊 Final status:" -ForegroundColor Cyan
git remote -v
