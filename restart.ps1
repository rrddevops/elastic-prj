Write-Host "Stopping and removing existing containers..." -ForegroundColor Green
docker-compose down -v

Write-Host "Removing existing volumes..." -ForegroundColor Green
docker volume rm elastic-prj_elasticsearch-data, elastic-prj_postgres-data -ErrorAction SilentlyContinue

Write-Host "Starting the stack..." -ForegroundColor Green
docker-compose up -d

Write-Host "Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host "Checking service status..." -ForegroundColor Green
docker-compose ps

Write-Host "Testing Elasticsearch connection..." -ForegroundColor Green
curl -u elastic:changeme http://localhost:9200/_cluster/health

Write-Host "Setup complete! You can access:" -ForegroundColor Cyan
Write-Host "- Kibana: http://localhost:5601" -ForegroundColor White
Write-Host "- Elasticsearch: http://localhost:9200" -ForegroundColor White
Write-Host "- APM Server: http://localhost:8200" -ForegroundColor White
Write-Host "- Backend API: http://localhost:3000" -ForegroundColor White
Write-Host "- Frontend: http://localhost:8080" -ForegroundColor White 