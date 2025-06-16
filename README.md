# Elastic Stack Demo Project

This project demonstrates a full-stack application with Elastic Stack integration, including APM, logging, and metrics collection. The application consists of a React frontend, Node.js backend, and PostgreSQL database, all monitored by the Elastic Stack.

## Components

- **Frontend**: React application with Elastic APM RUM integration
- **Backend**: Node.js/Express API with Elastic APM integration
- **Database**: PostgreSQL
- **Elastic Stack**:
  - Elasticsearch
  - Kibana
  - Logstash
  - APM Server
  - Metricbeat

## Prerequisites

- Docker
- Docker Compose
- Node.js 18+ (for local development)

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd elastic-prj
   ```

2. Start the application:
   ```bash
   docker-compose up -d
   ```

3. Access the applications:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:3000
   - Kibana: http://localhost:5601
   - Elasticsearch: http://localhost:9200
   - APM Server: http://localhost:8200

## Features

- User registration and listing
- Distributed tracing with APM
- Application metrics collection
- Log aggregation
- System metrics monitoring
- Container metrics monitoring

## Monitoring

### APM (Application Performance Monitoring)
- Access Kibana APM UI at http://localhost:5601/app/apm
- View traces, transactions, and errors for both frontend and backend services
- Monitor service dependencies and performance

### Logs
- Access Kibana Logs UI at http://localhost:5601/app/logs
- View application logs from both frontend and backend
- Search and analyze logs in real-time

### Metrics
- Access Kibana Metrics UI at http://localhost:5601/app/metrics
- View system and container metrics
- Monitor application performance metrics

## Development

### Frontend Development
```bash
cd frontend
npm install
npm start
```

### Backend Development
```bash
cd backend
npm install
npm run dev
```

## Environment Variables

### Frontend
- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:3000)
- `REACT_APP_APM_SERVER_URL`: APM Server URL (default: http://apm-server:8200)
- `REACT_APP_APM_SERVICE_NAME`: Frontend service name (default: frontend-service)

### Backend
- `POSTGRES_HOST`: PostgreSQL host (default: postgres)
- `POSTGRES_DB`: Database name (default: appdb)
- `POSTGRES_USER`: Database user (default: appuser)
- `POSTGRES_PASSWORD`: Database password (default: apppass)
- `ELASTIC_APM_SERVER_URL`: APM Server URL (default: http://apm-server:8200)
- `ELASTIC_APM_SERVICE_NAME`: Backend service name (default: backend-service)

## Stopping the Application

```bash
docker-compose down
```

To remove all data (including volumes):
```bash
docker-compose down -v
``` 