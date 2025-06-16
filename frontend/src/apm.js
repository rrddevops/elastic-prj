import { init as initApm } from '@elastic/apm-rum';

const apm = initApm({
  serviceName: process.env.REACT_APP_APM_SERVICE_NAME || 'frontend-service',
  serverUrl: process.env.REACT_APP_APM_SERVER_URL || 'http://apm-server:8200',
  environment: process.env.NODE_ENV || 'development',
  active: true,
  instrument: true,
  distributedTracing: true
});

export default apm; 