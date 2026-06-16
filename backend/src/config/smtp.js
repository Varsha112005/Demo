const nodemailer = require('nodemailer');

const requiredSettings = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM'];
const missingSettings = requiredSettings.filter((key) => !process.env[key]);
const isSmtpConfigured = missingSettings.length === 0;

let transporter = null;

if (!isSmtpConfigured) {
  console.warn(
    `SMTP is not configured. Missing: ${missingSettings.join(', ')}. Email OTP features will return a 503 response.`
  );
} else {
  const port = Number(process.env.SMTP_PORT);

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

const verifySmtpConnection = async () => {
  if (!transporter) {
    console.warn('SMTP verification skipped because SMTP is not configured.');
    return false;
  }

  try {
    await transporter.verify();
    console.log('SMTP connection verified');
    return true;
  } catch (error) {
    console.warn(`SMTP verification failed: ${error.message}`);
    return false;
  }
};

module.exports = {
  transporter,
  isSmtpConfigured,
  missingSettings,
  verifySmtpConnection
};
