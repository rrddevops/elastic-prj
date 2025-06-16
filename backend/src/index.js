const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const apm = require('elastic-apm-node').start({
  serviceName: process.env.ELASTIC_APM_SERVICE_NAME || 'backend-service',
  serverUrl: process.env.ELASTIC_APM_SERVER_URL || 'http://apm-server:8200',
  environment: process.env.NODE_ENV || 'development'
});

const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

// Initialize logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'backend-service' },
  transports: [
    new winston.transports.Console(),
    new ElasticsearchTransport({
      level: 'info',
      index: 'logs-backend',
      clientOpts: { node: 'http://elasticsearch:9200' }
    })
  ]
});

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// Initialize database
async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    logger.info('Database initialized successfully');
  } catch (err) {
    logger.error('Error initializing database:', err);
    throw err;
  } finally {
    client.release();
  }
}

// Routes
app.post('/api/users', async (req, res) => {
  const span = apm.startSpan('Create User');
  try {
    const { name, email } = req.body;
    logger.info('Creating new user', { name, email });

    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    logger.info('User created successfully', { userId: result.rows[0].id });
    res.status(201).json(result.rows[0]);
  } catch (err) {
    logger.error('Error creating user:', err);
    apm.captureError(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (span) span.end();
  }
});

app.get('/api/users', async (req, res) => {
  const span = apm.startSpan('Get Users');
  try {
    logger.info('Fetching all users');
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    logger.error('Error fetching users:', err);
    apm.captureError(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (span) span.end();
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

// Initialize database and start server
initDb()
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    logger.error('Failed to start server:', err);
    process.exit(1);
  }); 