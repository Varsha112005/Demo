const express = require('express');
const cors = require('cors');
require('dotenv').config();

const healthRoutes = require('./routes/health.routes');
const testRoutes = require('./routes/test.routes');
const authRoutes = require('./routes/authRoutes');
const notFound = require('./middleware/notFound.middleware');
const errorHandler = require('./middleware/error.middleware');
const requireDatabase = require('./middleware/requireDatabase.middleware');

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend API is running'
  });
});

app.use('/api/health', healthRoutes);
app.use('/api/test', testRoutes);
app.use('/api/auth', requireDatabase, authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
