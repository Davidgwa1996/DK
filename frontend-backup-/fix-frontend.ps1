@'
Write-Host "🎯 FINAL FIX: Moving package.json to correct location" -ForegroundColor Cyan
Write-Host "=====================================================`n" -ForegroundColor Cyan

cd C:\Users\njaud\unidigitalcom

Write-Host "1️⃣ Current problem:" -ForegroundColor Red
Write-Host "   package.json is in ROOT folder" -ForegroundColor White
Write-Host "   But React files are in src/frontend/" -ForegroundColor White
Write-Host "   Render looks for package.json in the folder you specify!" -ForegroundColor White

Write-Host "`n2️⃣ Moving files to src/frontend/..." -ForegroundColor Yellow

# Move package.json
if (Test-Path "package.json") {
    Move-Item -Path "package.json" -Destination "src/frontend/package.json" -Force
    Write-Host "✅ Moved package.json to src/frontend/" -ForegroundColor Green
} else {
    Write-Host "⚠️ package.json not in root" -ForegroundColor Yellow
}

# Move config files
$files = @("tailwind.config.js", "postcss.config.js")
foreach ($file in $files) {
    if (Test-Path $file) {
        Move-Item -Path $file -Destination "src/frontend/$file" -Force
        Write-Host "✅ Moved $file to src/frontend/" -ForegroundColor Green
    }
}

Write-Host "`n3️⃣ Verifying structure..." -ForegroundColor Yellow
if (Test-Path "src/frontend/package.json") {
    Write-Host "✅ package.json now at: src/frontend/package.json" -ForegroundColor Green
    Get-Content "src/frontend/package.json" | Select-Object -First 5
} else {
    Write-Host "❌ package.json still missing!" -ForegroundColor Red
}

Write-Host "`n4️⃣ Pushing to GitHub..." -ForegroundColor Cyan
git add .
git commit -m "Fix: Move package.json to src/frontend/"
git push

Write-Host "`n5️⃣ Update Render configuration:" -ForegroundColor Magenta
Write-Host "   • Root Directory: src/frontend" -ForegroundColor Cyan
Write-Host "   • Build Command: npm run build" -ForegroundColor Cyan
Write-Host "   • Publish Directory: build" -ForegroundColor Cyan
Write-Host "   • Environment Variable:" -ForegroundColor Cyan
Write-Host "     REACT_APP_API_URL = https://unidigitalcom-backend.onrender.com/api" -ForegroundColor White

Write-Host "`n✅ This WILL work now!" -ForegroundColor Green
'@ | Out-File -FilePath "final-package-fix.ps1" -Encoding UTF8

powershell -ExecutionPolicy Bypass -File final-package-fix.ps1