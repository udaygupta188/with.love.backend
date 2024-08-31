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


const updateProfile = async (userId, updateData) => {
  // Check if username is being updated
  if (updateData.username) {
    const existingUser = await User.findOne({ username: updateData.username });

    if (existingUser && existingUser._id.toString() !== userId.toString()) {
      throw new Error('Username is already taken');
    }
  }

  // Find the user and update their profile
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  // Update the user's profile with the new data
  Object.keys(updateData).forEach(key => {
    user[key] = updateData[key];
  });

  await user.save();

  return { message: 'Profile updated successfully', user };
};



const followUser = async (userId, targetUserId) => {
  // Convert both IDs to string before comparing
  if (userId.toString() === targetUserId.toString()) {
    throw new Error('You cannot follow yourself');
  }

  // Check if the target user exists and is active
  const [user, targetUser] = await Promise.all([
    User.findById(userId),
    User.findById(targetUserId),
  ]);

  if (!user) {
    throw new Error('User not found');
  }

  if (!targetUser) {
    throw new Error('Target user not found');
  }

  if (targetUser.status !== 'active') {
    return { message: 'User Not Found whom you want to follow' }; //Target user is not active
  }

  // Check if already following
  if (user.following.includes(targetUserId)) {
    return { message: 'You are already following this user', user };
  }

  // Proceed with the follow logic
  const updatedUser = await User.findByIdAndUpdate(userId, { $addToSet: { following: targetUserId } }, { new: true });
  await User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: userId } });

  return { message: 'Successfully followed the user', user: updatedUser };
};




const unfollowUser = async (userId, targetUserId) => {

  if (userId.toString() === targetUserId.toString()) {
    throw new Error('You cannot unfollow yourself');
  }

  // Remove the target user from the follower's following list
  const user = await User.findByIdAndUpdate(userId, { $pull: { following: targetUserId } }, { new: true });

  // Remove the follower from the target user's followers list
  await User.findByIdAndUpdate(targetUserId, { $pull: { followers: userId } });

  return { message: 'Successfully unfollowed the user', user };
};



const suggestUsername = async (baseName) => {
  try {
    if (!baseName) {
      throw new Error('Base name is required for username suggestions.');
    }

    // Validate and sanitize the base name
    const sanitizedBaseName = baseName.trim().replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    if (!sanitizedBaseName) {
      throw new Error('Base name contains invalid characters, please provide a valid name.');
    }

    const suggestions = [];
    const suffixes = ['_', '.', '-', '01', '123']; // Common suffixes for more readable usernames
    const maxAttempts = 5;
    let attempts = 0;

    while (suggestions.length < maxAttempts && attempts < maxAttempts * 2) {
      const suggestedName = generatePrettyUsername(sanitizedBaseName, suffixes, attempts);

      const existingUser = await User.findOne({ username: suggestedName });

      if (!existingUser) {
        suggestions.push(suggestedName);
      }

      attempts++;
    }

    if (suggestions.length === 0) {
      throw new Error('No available usernames found, try a different base name.');
    }

    return suggestions;
  } catch (error) {
    console.error('Error generating username suggestions:', error);
    throw error;
  }
};

// Helper function to generate more readable usernames
const generatePrettyUsername = (baseName, suffixes, attempts) => {
  let suggestedName = baseName;

  if (attempts === 0) {
    suggestedName = `${baseName}`;
  } else if (attempts < suffixes.length) {
    suggestedName = `${baseName}${suffixes[attempts]}`;
  } else {
    suggestedName = `${baseName}${suffixes[attempts % suffixes.length]}${Math.floor(10 + Math.random() * 90)}`;
  }

  return suggestedName;
};


module.exports = { 
  registerUser, 
  usernameCheck,
  getUserProfile,
  updateProfile,
  followUser,
  unfollowUser,
  suggestUsername
};
