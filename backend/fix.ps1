Write-Host "🔧 KILLING PROCESSES ON PORT 5000" -ForegroundColor Red

# Kill PID 11940
Write-Host "`n🛑 Killing PID 11940..." -ForegroundColor Yellow
taskkill /PID 11940 /F 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Killed PID 11940" -ForegroundColor Green
} else {
    Write-Host "⚠️ PID 11940 already gone" -ForegroundColor Yellow
}

# Kill PID 17848
Write-Host "`n🛑 Killing PID 17848..." -ForegroundColor Yellow
taskkill /PID 17848 /F 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Killed PID 17848" -ForegroundColor Green
} else {
    Write-Host "⚠️ PID 17848 already gone" -ForegroundColor Yellow
}

# Wait
Write-Host "`n⏳ Waiting 3 seconds..." -ForegroundColor Cyan
Start-Sleep -Seconds 3

# Verify
Write-Host "`n🔍 Checking port 5000..." -ForegroundColor Cyan
$check = netstat -ano | findstr :5000
if ($check) {
    Write-Host "❌ STILL IN USE:" -ForegroundColor Red
    Write-Host $check
    Write-Host "`n🚨 Using alternate port 5001..." -ForegroundColor Red
    
    # Change to port 5001
    (Get-Content .env -ErrorAction SilentlyContinue) -replace 'PORT=5000', 'PORT=5001' | Set-Content .env
    Write-Host "✅ Changed to port 5001" -ForegroundColor Green
} else {
    Write-Host "✅ PORT 5000 IS FREE!" -ForegroundColor Green
}

# Start backend
Write-Host "`n🚀 Starting UniDigital backend..." -ForegroundColor Cyan
npm start