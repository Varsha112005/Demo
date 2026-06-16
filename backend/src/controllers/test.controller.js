const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

const getTestConnection = (req, res) => {
  const cloudinaryConfig = cloudinary.config();

  res.status(200).json({
    success: true,
    message: 'Frontend connected to backend successfully',
    services: {
      backend: 'connected',
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      cloudinary: cloudinaryConfig.cloud_name ? 'configured' : 'not configured'
    }
  });
};

module.exports = {
  getTestConnection
};
