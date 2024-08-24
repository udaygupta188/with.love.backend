const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Admin = require('../models/admin/adminModel');
const Session = require('../models/sessionModel');
const Activity = require('../models/activityModel');
const helper= require('../utils');
const { logUserLogin } = require('../services/loginService'); 
const { refreshTokenSecret } = require('../configs/jwt.config');


const authenticateUser = async (emailOrUsername, password, country, device, IP) => {
  try {
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ]
    });
    if (!user) {
      throw new Error('Invalid email/username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email/username or password');
    }

    // Generate a session token
    const sessionToken = helper.generateSessionToken(user._id);

    // Log user login details
    await logUserLogin(emailOrUsername, user._id, country, device, IP);

  // Create a new session for this login
    const session = new Session({
      user: user._id,
      token: sessionToken,
      device,
      ip_address: IP,
      login_time: new Date(),
    });
    await session.save();

    return { user, sessionToken };
  } catch (error) {
    throw error;
  }
};


const authenticateAdmin = async (emailOrUsername, password) => {
  try {
    const admin = await Admin.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ]
    });

    if (!admin) {
      throw new Error('Invalid email/username or password');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new Error('Invalid email/username or password');
    }

    return admin;
  } catch (error) {
    throw error;
  }
};

const generateTokens = async (userOrAdmin) => {
  try {
    const accessToken = helper.generateAccessToken(userOrAdmin);
    const refreshToken = helper.generateRefreshToken(userOrAdmin);

    // Store the refresh token in the database
    userOrAdmin.refreshToken = refreshToken;
    await userOrAdmin.save();

    return { access_token: accessToken, refresh_token: refreshToken };
  } catch (error) {
    throw error;
  }
};

const refreshTokens = async (refreshToken) => {
  try {
    const decoded = helper.verifyToken(refreshToken, refreshTokenSecret);
    const userOrAdmin = await User.findById(decoded.id) || await Admin.findById(decoded.id);

    if (!userOrAdmin || userOrAdmin.refreshToken !== refreshToken) {
      throw new Error('Invalid refresh token');
    }

    // Generate new tokens
    const accessToken = helper.generateAccessToken(userOrAdmin);
    const newRefreshToken = helper.generateRefreshToken(userOrAdmin);

    // Store the new refresh token in the database
    userOrAdmin.refreshToken = newRefreshToken;
    await userOrAdmin.save();

    return { access_token: accessToken, refresh_token: newRefreshToken };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authenticateAdmin,
  generateTokens,
  refreshTokens,
  authenticateUser
};
