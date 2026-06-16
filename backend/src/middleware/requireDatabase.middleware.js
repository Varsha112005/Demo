const mongoose = require('mongoose');

const requireDatabase = (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }

  res.status(503);
  return next(new Error('Database is not connected. Please check the MongoDB connection and restart the backend.'));
};

module.exports = requireDatabase;
