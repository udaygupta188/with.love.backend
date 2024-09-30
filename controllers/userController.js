const BrandCuratorInteraction = require('../models/BrandCuratorInteractionModel');
const userService = require('../services/userService');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../utils'); // Importing All helper functions

const register = async (req, res) => {
  try {
    const { name, email, username, password, profile_avatar, phone, address, date_of_birth, gender } = req.body;

    // Validate input
    if (!name || !email || !username || !password) {
      return apiErrorResponse(res, 'Name, email, username, and password are required.', null, HTTP_STATUS.BAD_REQUEST);
    }

    // Check if username already exists
    const usernameCheck = await userService.usernameCheck(username);
    if (usernameCheck.exists) {
      return apiErrorResponse(res, 'Username already exists.', null, HTTP_STATUS.BAD_REQUEST);
    }

    // Call service to register user
    const result = await userService.registerUser({
      name,
      email,
      username,
      password,
      profile_avatar,
      phone,
      address,
      date_of_birth,
      gender
    });

    if (result.success) {
      return apiSuccessResponse(res, 'User registered successfully', result.user, HTTP_STATUS.CREATED);
    } else {
      return apiErrorResponse(res, result.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  } catch (error) {
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Call the service to get the user profile
    const user = await userService.getUserProfile(userId);

    if (!user) {
      return apiErrorResponse(res, 'User not found', null, HTTP_STATUS.NOT_FOUND);
    }

    return apiSuccessResponse(res, 'User profile retrieved successfully', user);
  } catch (error) {
    console.error('Get Profile error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from authenticated user
    const updateData = req.body;

    const result = await userService.updateProfile(userId, updateData);

    return apiSuccessResponse(res, result.message, result.user, HTTP_STATUS.OK);
  } catch (error) {
    console.error('Update Profile error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const followUser = async (req, res) => {
  try {
    const userId = req.user._id; // Get userId from authenticated user
    const { targetUserId } = req.params;

    const result = await userService.followUser(userId, targetUserId);

    return apiSuccessResponse(res, result.message, result.user, HTTP_STATUS.OK);
  } catch (error) {
    console.log(error)
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

const unfollowUser = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in req.user from authentication middleware
    const targetUserId = req.params.id;

    const result = await userService.unfollowUser(userId, targetUserId);

    return apiSuccessResponse(res, result.message, result.user, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};


const suggestUsername = async (req, res) => {
  try {
    const username = req.body.username;

    if (!username) {
      // Handle the case where the base name is not provided
      return apiErrorResponse(res, 'Base name is required for username suggestions.', null, HTTP_STATUS.BAD_REQUEST);
    }

    const suggestions = await userService.suggestUsername(username);

    if (suggestions.length === 0) {
      // Handle the case where no suggestions are found
      return apiErrorResponse(res, 'No available usernames found, try a different base name.', null, HTTP_STATUS.NOT_FOUND);
    }

    return apiSuccessResponse(res, 'Username suggestions retrieved successfully.', suggestions, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, 'Internal Server Error', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

const becomeCurator = async (req, res) => {
  try {
    const userId = req.user.id;
    const { platform, socialId, followers } = req.body;

    // let data = {
    //   userId: userId,
    //   platForm: platform,
    //   socialId:socialId,
    //   followers:followers
    // }
    if (!userId) {

      return apiErrorResponse(res, 'User not logged-in.', null, HTTP_STATUS.UNAUTHORIZED);
    }
    const socialMedia = await userService.becomeCurator(userId, platform, socialId, followers)

    if (!socialMedia.status) {
      return apiErrorResponse(res, 'Instagram account not found for this user.', null, HTTP_STATUS.NOT_FOUND);
    }
    if (socialMedia.status) {

      return apiSuccessResponse(res, socialMedia.message, socialMedia.user, HTTP_STATUS.OK);
    }


  } catch (error) {
    console.error(error);
    return apiErrorResponse(res, 'Server error.', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
const brandInteractions = async(req, res) =>{
  try {
    const curatorId = req.user._id; // Assuming the curator is logged in
    const interactions = await BrandCuratorInteraction
      .find({ curator: curatorId })
      .populate('brand', 'name logo') // Populate brand details
      .sort({ reachedAt: -1 }); // Sort by date (newest first)
      await apiSuccessResponse(res, "", interactions,200 )
  } catch (error) {
    
  }
}
module.exports = {
  register,
  getProfile,
  updateProfile,
  followUser,
  unfollowUser,
  suggestUsername,
  becomeCurator,
  brandInteractions
};
