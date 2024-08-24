const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const mailTemplates = require('../templates/emailTemplates')

// Service to register a new user
const registerUser = async (userData) => {
  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username: userData.username }, { email: userData.email }],
    });
    if (existingUser) {
      return { success: false, message: "Username or email already exists." };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create new user
    const newUser = new User({
      ...userData,
      password: hashedPassword,
    });

    // Save user to the database
    await newUser.save();
    return { success: true, user: newUser };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Service to check if a username exists
const usernameCheck = async (username) => {
  try {
    const user = await User.findOne({ username });
    return { exists: !!user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

const getUserProfile = async (userId) => {
  try {
    // Find the user by ID and exclude password and version fields
    const user = await User.findById(userId).select("-password -__v");
    return user;
  } catch (error) {
    throw new Error("Failed to retrieve user profile");
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
console.log(fullResetUrl);
  // Send reset password email
  await mailTemplates.sendForgotPasswordEmail(user.email, fullResetUrl);


  return { success: true, message: 'Password reset link sent to your email.' };
};

module.exports = { 
  registerUser, 
  usernameCheck,
  getUserProfile,
  forgotPassword
};
