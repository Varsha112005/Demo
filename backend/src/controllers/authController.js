const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateOtp = require('../utils/generateOtp');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');

const getOtpExpiryDate = () => {
  const expiryMinutes = Number(process.env.OTP_EXPIRES_IN_MINUTES || 10);
  return new Date(Date.now() + expiryMinutes * 60 * 1000);
};

const buildUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  isEmailVerified: user.isEmailVerified,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

const sendOtpEmail = async ({ email, name, otp, purpose }) => {
  const appName = process.env.APP_NAME || 'Auth Demo App';
  const subject =
    purpose === 'login'
      ? `${appName} login verification code`
      : `${appName} email verification code`;

  await sendEmail({
    to: email,
    subject,
    text: `Hello ${name}, your ${purpose} OTP is ${otp}. It expires in ${process.env.OTP_EXPIRES_IN_MINUTES || 10} minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>${subject}</h2>
        <p>Hello ${name},</p>
        <p>Your OTP is:</p>
        <p style="font-size: 24px; font-weight: 700; letter-spacing: 4px;">${otp}</p>
        <p>This code expires in ${process.env.OTP_EXPIRES_IN_MINUTES || 10} minutes.</p>
      </div>
    `
  });
};

const handleOtpEmailError = (error, res, next) => {
  if (error.code === 'EMAIL_NOT_CONFIGURED') {
    return res.status(503).json({
      success: false,
      message: 'Email service is not configured. OTP cannot be sent.'
    });
  }

  if (error.code === 'EMAIL_SEND_FAILED') {
    return res.status(503).json({
      success: false,
      message: 'Email service failed to send OTP. Please try again later.'
    });
  }

  return next(error);
};

const setHashedOtp = async (user) => {
  const otp = generateOtp();
  user.otp = await bcrypt.hash(otp, 10);
  user.otpExpiresAt = getOtpExpiryDate();
  return otp;
};

const verifyUserOtp = async ({ email, otp }) => {
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+otp');

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  if (!user.otp || !user.otpExpiresAt) {
    const error = new Error('OTP not found. Please request a new OTP.');
    error.statusCode = 400;
    throw error;
  }

  if (user.otpExpiresAt < new Date()) {
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    const error = new Error('OTP expired. Please request a new OTP.');
    error.statusCode = 400;
    throw error;
  }

  const isOtpValid = await bcrypt.compare(otp, user.otp);

  if (!isOtpValid) {
    const error = new Error('Invalid OTP');
    error.statusCode = 400;
    throw error;
  }

  return user;
};

const register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Name, email, and password are required');
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser?.isEmailVerified) {
      res.status(409);
      throw new Error('User already exists');
    }

    const user =
      existingUser ||
      new User({
        email: normalizedEmail,
        isEmailVerified: false
      });

    user.name = name.trim();
    user.password = await bcrypt.hash(password, 10);

    const otp = await setHashedOtp(user);
    await sendOtpEmail({ email: user.email, name: user.name, otp, purpose: 'register' });
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Registration successful. OTP sent to your email.'
    });
  } catch (error) {
    handleOtpEmailError(error, res, next);
  }
};

const verifyRegisterOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400);
      throw new Error('Email and OTP are required');
    }

    const user = await verifyUserOtp({ email, otp });
    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      token: generateToken(user._id),
      user: buildUserResponse(user)
    });
  } catch (error) {
    res.status(error.statusCode || res.statusCode);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    if (!user.isEmailVerified) {
      res.status(403);
      throw new Error('Please verify your email before logging in');
    }

    const otp = await setHashedOtp(user);
    await sendOtpEmail({ email: user.email, name: user.name, otp, purpose: 'login' });
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Login OTP sent to your email'
    });
  } catch (error) {
    handleOtpEmailError(error, res, next);
  }
};

const verifyLoginOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400);
      throw new Error('Email and OTP are required');
    }

    const user = await verifyUserOtp({ email, otp });

    if (!user.isEmailVerified) {
      res.status(403);
      throw new Error('Please verify your email before logging in');
    }

    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Login verified successfully',
      token: generateToken(user._id),
      user: buildUserResponse(user)
    });
  } catch (error) {
    res.status(error.statusCode || res.statusCode);
    next(error);
  }
};

const getProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: buildUserResponse(req.user)
  });
};

module.exports = {
  getProfile,
  login,
  register,
  verifyLoginOtp,
  verifyRegisterOtp
};
