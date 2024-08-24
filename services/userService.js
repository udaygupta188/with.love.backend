const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

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

module.exports = { registerUser, usernameCheck, getUserProfile };
