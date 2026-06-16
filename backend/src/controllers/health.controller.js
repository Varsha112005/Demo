const mongoose = require('mongoose');
const { isSmtpConfigured } = require('../config/smtp');

const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running',
    environment: process.env.NODE_ENV || 'development',
    emailService: isSmtpConfigured ? 'configured' : 'not_configured',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  getHealth
};
