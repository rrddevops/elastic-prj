Write-Host "Restarting APM Server..." -ForegroundColor Green
docker-compose restart apm-server

Write-Host "Waiting for APM Server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

Write-Host "Checking APM Server logs..." -ForegroundColor Green
docker-compose logs apm-server --tail=20

Write-Host "Testing APM Server connection..." -ForegroundColor Green
curl http://localhost:8200 