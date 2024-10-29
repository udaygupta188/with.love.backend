const bcrypt = require('bcrypt');
const Admin = require('../admin/adminProfile/adminProfile.model');
const {User} = require('../user/userProfile/userProfile.model')
const helper= require('../../utils');
const { logUserLogin } = require('../../services/loginService'); 
const { refreshTokenSecret } = require('../../configs/jwt.config');
const crypto = require('crypto');
const { sendForgotPasswordEmail } = require('../../templates/emailTemplates');
const { Session } = require('./auth.model');



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

    if(user.status === 'inactive'){
      throw new Error('Account is inactive, please contact admin.')
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




// Function to handle forgot password
const forgotPassword = async (userId,resetUrl) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Generate a reset token (for example, using crypto)
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // Store the token in the user's document with an expiration time (e.g., 1 hour)
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

    // Add the reset token to the reset URL
    const fullResetUrl = `${resetUrl}/${resetToken}`;

  // Send reset password email
  await sendForgotPasswordEmail(user.email, fullResetUrl);


  return { success: true, message: 'Password reset link sent to your email.' };
};


const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw new Error('Password reset token is invalid or has expired');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return { message: 'Password has been reset successfully' };
};



module.exports = {
  authenticateAdmin,
  generateTokens,
  refreshTokens,
  authenticateUser,
  forgotPassword,
  resetPassword
};
