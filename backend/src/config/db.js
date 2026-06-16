const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri =
    process.env.MONGO_URI_DIRECT ||
    process.env.MONGO_URI ||
    process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MongoDB connection string is missing in .env. Add MONGO_URI or MONGO_URI_DIRECT.');
  }

  try {
    const connection = await mongoose.connect(mongoUri);

    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    if (error.message.includes('querySrv')) {
      throw new Error(
        'MongoDB DNS SRV lookup failed. Your network/DNS cannot resolve the mongodb+srv Atlas URI. Use Google DNS/Cloudflare DNS, or add a standard mongodb:// URI as MONGO_URI_DIRECT in .env.'
      );
    }

    throw error;
  }
};

module.exports = connectDB;
