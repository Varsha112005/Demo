const cloudinary = require('cloudinary').v2;

const configureCloudinary = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    console.warn('Cloudinary credentials are missing. Upload features may be unavailable.');
    return null;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  });

  console.log('Cloudinary configured');
  return cloudinary;
};

module.exports = configureCloudinary;
