const { transporter } = require('../config/smtp');

const sendEmail = async ({ html, subject, text, to }) => {
  if (!transporter) {
    const error = new Error('Email service is not configured');
    error.statusCode = 503;
    error.code = 'EMAIL_NOT_CONFIGURED';
    throw error;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html
    });
  } catch (error) {
    const emailError = new Error('Email service failed to send message');
    emailError.statusCode = 503;
    emailError.code = 'EMAIL_SEND_FAILED';
    emailError.cause = error;
    throw emailError;
  }
};

module.exports = sendEmail;
