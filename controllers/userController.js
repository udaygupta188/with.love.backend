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

module.exports = { 
  register,
  getProfile,
  updateProfile
 };
