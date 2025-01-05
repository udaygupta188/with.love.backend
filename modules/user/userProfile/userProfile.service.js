const { RolesAnywhere } = require("aws-sdk");
// const SocialMedia = require("../../../models/socialMediaModel");
const { User, Influencer } = require("./userProfile.model.js");
const Role = require("../../admin/role/role.model.js");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");
const { sendEmail } = require("../../../services/emailService.js");

const {
  sendRegistrationEmail,
} = require("../../../templates/emailTemplates.js");
const OTP = require("../../otp/otp.model.js");
// const Influencer = require("../models/influencerModel.js");

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
      throw new Error("Username is already taken");
    }
  }

  // Find the user and update their profile
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Update the user's profile with the new data
  Object.keys(updateData).forEach((key) => {
    user[key] = updateData[key];
    console.log(updateData[key], user[key]);
  });
  console.log(user, updateData);
  await user.save();

  return { message: "Profile updated successfully", user };
};

const followUser = async (userId, targetUserId) => {
  // Convert both IDs to string before comparing
  if (userId.toString() === targetUserId.toString()) {
    throw new Error("You cannot follow yourself");
  }

  // Check if the target user exists and is active
  const [user, targetUser] = await Promise.all([
    User.findById(userId),
    User.findById(targetUserId),
  ]);

  if (!user) {
    throw new Error("User not found");
  }

  if (!targetUser) {
    throw new Error("Target user not found");
  }

  if (targetUser.status !== "active") {
    return { message: "User Not Found whom you want to follow" }; //Target user is not active
  }

  // Check if already following
  if (user.following.includes(targetUserId)) {
    return { message: "You are already following this user", user };
  }

  // Proceed with the follow logic
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { following: targetUserId } },
    { new: true }
  );
  await User.findByIdAndUpdate(targetUserId, {
    $addToSet: { followers: userId },
  });

  return { message: "Successfully followed the user", user: updatedUser };
};

const unfollowUser = async (userId, targetUserId) => {
  if (userId.toString() === targetUserId.toString()) {
    throw new Error("You cannot unfollow yourself");
  }

  // Remove the target user from the follower's following list
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { following: targetUserId } },
    { new: true }
  );

  // Remove the follower from the target user's followers list
  await User.findByIdAndUpdate(targetUserId, { $pull: { followers: userId } });

  return { message: "Successfully unfollowed the user", user };
};

const suggestUsername = async (baseName) => {
  try {
    if (!baseName) {
      throw new Error("Base name is required for username suggestions.");
    }

    // Validate and sanitize the base name
    const sanitizedBaseName = baseName
      .trim()
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();

    if (!sanitizedBaseName) {
      throw new Error(
        "Base name contains invalid characters, please provide a valid name."
      );
    }

    const suggestions = [];
    const suffixes = ["_", ".", "-", "01", "123"]; // Common suffixes for more readable usernames
    const maxAttempts = 5;
    let attempts = 0;

    while (suggestions.length < maxAttempts && attempts < maxAttempts * 2) {
      const suggestedName = generatePrettyUsername(
        sanitizedBaseName,
        suffixes,
        attempts
      );

      const existingUser = await User.findOne({ username: suggestedName });

      if (!existingUser) {
        suggestions.push(suggestedName);
      }

      attempts++;
    }

    if (suggestions.length === 0) {
      throw new Error(
        "No available usernames found, try a different base name."
      );
    }

    return suggestions;
  } catch (error) {
    console.error("Error generating username suggestions:", error);
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
    suggestedName = `${baseName}${
      suffixes[attempts % suffixes.length]
    }${Math.floor(10 + Math.random() * 90)}`;
  }

  return suggestedName;
};

const becomeCurator = async (userId, platform, socialId, followers) => {
  try {
    const curator = await Role.findOne({ name: "curator" });
    // Step 1: Check if the social media entry exists for the user and platform
    let socialMedia = await SocialMedia.findOne({
      user: userId,
      platform: platform,
    });

    // Step 2: If no social media entry exists, create a new one
    // if (!socialMedia) {
    //   socialMedia = new SocialMedia({
    //     user: userId,
    //     platform,
    //     socialId,
    //     followers
    //   });
    //   await socialMedia.save();
    // } else {
    //   // Step 3: If social media exists, update the followers and socialId if needed
    //   socialMedia.socialId = socialId;
    //   socialMedia.followers = followers;
    //   await socialMedia.save();
    // }

    // Step 4: Check if the user has enough followers to become a curator
    if (socialMedia.followers >= 10000) {
      let influencer = await Influencer.findOne({ userId: userId });
      if (influencer) {
        return { status: false, message: "You are already curator!" };
      }
      await User.findByIdAndUpdate(
        userId,
        { role: curator._id },
        { new: true }
      ); // Update the user's role to curator
      const newInfluencer = new Influencer({
        userId,
      });
      await newInfluencer.save();
      return { status: true, message: "You are now a curator!" };
    } else {
      return {
        status: false,
        message: "You need at least 10000 followers to become a curator.",
      };
    }
  } catch (err) {
    return { status: false, message: err.message };
  }
};

const addSocialMedia = async (requestedData) => {
  try {
    const { userId, platform, socialId, followers } = requestedData;
    console.log(userId, platform, socialId, followers);
    // Create a new SocialMedia record
    if (!userId || !platform || !socialId || !followers) {
      return {
        status: false,
        message: "User, platform, socialId and followers are required",
      };
    }

    const result = new SocialMedia({
      platform,
      user: userId,
      socialId,
      followers,
    });

    await result.save();

    return {
      status: true,
      message: "Social Detail added",
      social: result,
    };
  } catch (err) {
    return { status: false, message: err.message };
  }
};

const getFollowers = async (userId) => {
  try {
    const result = await User.findById(userId).populate(
      "followers",
      "username"
    );
    return { status: true, data: result };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

const getFollowing = async (userId) => {
  try {
    const result = await User.findById(userId).populate(
      "following",
      "username"
    );
    return { status: true, data: result };
  } catch (error) {
    return { status: false, message: error.message };
  }
};

const registeration = async (payload) => {
  try {
    console.log(payload,"paylload 329");
    const user = await User.findOne({ email: payload.email });
    const role = await Role.findOne({ _id: payload.roleId });
    if (user) {
      throw new Error("Already account with this email.");
    }
    const emailParts = payload.email.split("@");
    const emailForUsername = emailParts[0];

    const username = await suggestUsername(emailForUsername);
    console.log("339", role)
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    let currentStatus = "inactive";
    let seller_approval = false;
    if (role.name === "User") {
      currentStatus = "active";
      seller_approval= true
    }
    console.log(payload,"payload")
    const result = new User({
      status: currentStatus,
      email: payload.email,
      name: payload.name,
      role: payload.roleId,
      subRole: payload.subRoleId,
      password: hashedPassword,
      username: username[1],
      seller_approval: seller_approval,
      profile_completeness: 1,
    });
    await result.save();
    return { status: true, data: result };
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendOtp = async (payload) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
    await sendRegistrationEmail(payload.email, otp);
    const storeOtp = new OTP({
      email: payload.email,
      otp: otp,
      expiresAt: expirationTime,
    });
    await storeOtp.save();
    return { status: true, message: "OTP Send On Your Mail", data: otp };
  } catch (error) {
    throw new Error(error.message);
  }
};

const resendOtp = async(payload) =>{
  try {
    const isOtpExpired = await OTP.findOne({ email: payload.email }).sort({ createdAt: -1 });
    if (isOtpExpired && isOtpExpired.expiresAt > new Date()) {
      return { status: false, message: "Current OTP is still valid, not expired yet" };
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
    await sendRegistrationEmail(payload.email, otp);
    const storeOtp = new OTP({
      email: payload.email,
      otp: otp,
      expiresAt: expirationTime,
    });
    await storeOtp.save();
    return { status: true, message: "OTP Send On Your Mail", data: otp };
  } catch (error) {
    throw new Error(error.message);
  }
}

const validateOtp = async (payload) => {
  try {
    const otp = await OTP.findOne({ email: payload.data.email });

    if (!otp) {
      return { status: false, message: "otp not found" };
    }
    if (otp.otp !== payload.otp && Date.now() > otp.expiresAt) {
      throw new Error("Invalid or expired OTP");
    } else {
      await registeration(payload.data);
    }
    return { status: true, message: "OTP verified" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const setPassword = async (payload) => {
  try {
    const { email, password } = payload;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.profile_completeness = 3;
    await user.save();
    return {
      status: true,
      message: "Password set successfully. Proceed to select user type.",
      data: user,
    };
  } catch (error) {
    throw new Error("Error setting password");
  }
};

const selectUserType = async (payload) => {
  try {
    const { email, roleId } = payload;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }
    user.role = roleId; // Example: 'seller', 'buyer', 'model'
    user.profile_completeness = 4;
    await user.save();
    return {
      status: true,
      message:
        "User type selected successfully. Please procced for SubRole selection.",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error selecting user type");
  }
};

const selectSubRole = async (payload) => {
  try {
    const { email, subRole } = payload;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    user.subRole = subRole; // Example: 'seller', 'buyer', 'model'
    user.profile_completeness = 5;
    await user.save();
    return {
      status: true,
      message: "Sub Role selected successfully. Registration complete.",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  registerUser,
  usernameCheck,
  getUserProfile,
  updateProfile,
  followUser,
  unfollowUser,
  suggestUsername,
  becomeCurator,
  addSocialMedia,
  getFollowers,
  getFollowing,
  registeration,
  validateOtp,
  setPassword,
  selectUserType,
  selectSubRole,
  sendOtp,
  resendOtp
};
