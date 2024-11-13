const BrandCuratorInteraction = require('../../../models/BrandCuratorInteractionModel');
const userService = require('./userProfile.service');
const brandService = require('../../admin/brand/brand.service')
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../../utils'); // Importing All helper functions
const Role = require('../../admin/role/role.model');
const Brand = require('../../admin/brand/brand.model');
const Requests = require('../../admin/requests/requests.model');

const register = async (req, res) => {
  try {
    const brandRole = await Role.findOne({ name: { $regex: "Brand", $options: 'i' } });

    const { name, email, username, password, role, profile_avatar, phone, address, date_of_birth, gender, description, logo, subRole } = req.body;

    // Validate input
    if (!name || !email || !username || !password || !role) {
      return apiErrorResponse(res, 'Name, email, username,  password and role are required.', null, HTTP_STATUS.BAD_REQUEST);
    }

    // Check if username already exists
    const usernameCheck = await userService.usernameCheck(username);
    if (usernameCheck.exists) {
      return apiErrorResponse(res, 'Username already exists.', null, HTTP_STATUS.BAD_REQUEST);
    }
    console.log(role, brandRole._id.toString())
    let roleId = brandRole._id.toString();
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
      gender,
      role,
      status: role === roleId ? 'inactive' : 'active',
      subRole
    });
    if (role === roleId) {

      const brand = new Brand({
        name: name,
        description: description,
        logo: logo,
        status: 'inactive',
        createdBy: result.user._id,
        createdByModel: 'User'
      });
      await brand.save();
      const newRequest = new Requests({
        brandId: brand?._id,
        userId: result.user._id,
      })
      await newRequest.save();

    }
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
    const userId = req.user._id;
    console.log(userId)
    const { platform, socialId, followers } = req.body;

    if (!userId) {
      return apiErrorResponse(res, 'User not logged-in.', null, HTTP_STATUS.UNAUTHORIZED);
    }
    if (!socialId || !platform || !followers) {
      return apiErrorResponse(res, "Socail-Id, platforma and followers are required!")
    }
    const socialMedia = await userService.becomeCurator(userId, platform, socialId, followers)

    if (!socialMedia.status) {
      return apiErrorResponse(res, 'Instagram account not found for this user.', socialMedia.message, HTTP_STATUS.NOT_FOUND);
    }
    if (socialMedia.status) {
      return apiSuccessResponse(res, socialMedia.message, socialMedia.user, HTTP_STATUS.OK);
    }


  } catch (error) {
    console.error(error);
    return apiErrorResponse(res, 'Server error.', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
const brandInteractions = async (req, res) => {
  try {
    const curatorId = req.user._id; // Assuming the curator is logged in
    const interactions = await BrandCuratorInteraction
      .find({ curator: curatorId })
      .populate('brand', 'name logo') // Populate brand details
      .sort({ reachedAt: -1 }); // Sort by date (newest first)
    return await apiSuccessResponse(res, "", interactions, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, 'Internal Server Error', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

const addSocialMedia = async (req, res) => {
  try {
    const result = await userService.addSocialMedia(req.body);
    if (!result.status) {
      return apiErrorResponse(res, result.message, null, HTTP_STATUS.BAD_REQUEST);
    }
    return apiSuccessResponse(res, "Socail saved successfully", result.social, HTTP_STATUS.OK)
  } catch (error) {
    return apiErrorResponse(res, 'Server error.', null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const followers = await userService.getFollowers(userId)
    if (!followers.data.length) {
      return apiErrorResponse(res, 'No Followers found', null, HTTP_STATUS.BAD_REQUEST)
    }
    return apiSuccessResponse(res, 'Fetched successfully followers', followers, HTTP_STATUS.OK)
  } catch (error) {
    return apiErrorResponse(res, 'Error Occured', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
}

const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const following = await userService.getFollowing(userId)
    if (!following.data.length) {
      return apiErrorResponse(res, 'No Following found', null, HTTP_STATUS.BAD_REQUEST)
    }
    return apiSuccessResponse(res, 'Fetched successfuly following', following, HTTP_STATUS.OK);
  } catch (error) {
    return apiErrorResponse(res, 'Error Occured', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
}

const registeration = async (req, res) => {
  try {
    // const { email, name, phone } = req.body;
    const result = await userService.registeration(req.body);
    if (!result.status) {
      apiErrorResponse(res, "Some thing went wrong", {}, HTTP_STATUS.INTERNAL_SERVER_ERROR)
    }
    apiSuccessResponse(res, "Basic info successfully saved", result.data, HTTP_STATUS.OK)

  } catch (error) {
    apiErrorResponse(res, "Internal server error", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)

  }
}

const validateOtp = async (req, res) => {
  try {
    // const { email, otp } = req.body;
    const result = await userService.validateOtp(req.body)
    if (!result.status) {
      apiErrorResponse(res, result.message, null, HTTP_STATUS.BAD_REQUEST)
    }
    apiSuccessResponse(res, result.message, {}, HTTP_STATUS.OK)
  } catch (error) {
    apiErrorResponse(res, 'Internal server error', error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)

  }
}

const setPassword = async (req, res) => {
  try {
    const result = await userService.setPassword(req.body);
    if (result.status) {
      apiSuccessResponse(res, 'Password set successfully. Proceed to select user type.', result.data, HTTP_STATUS.OK);
    }
  } catch (error) {
    apiErrorResponse(res, "Error Occured", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
}

const selectUserType = async (req, res) => {
  try {
    const result = await userService.selectUserType(req.body);
    if (result.status) {
      apiSuccessResponse(res, result.message, result.data, HTTP_STATUS.OK)
    }
  } catch (error) {
    apiErrorResponse(res, "Error Occured", error.message, HTTP_STATUS.INTERNAL_SERVER_ERROR)
  }
}

const selectSubRole = async (req, res) => {
  try {
    const result = await userService.selectSubRole(req.body);
    if (result.status) {
      apiSuccessResponse(res, result.message, {}, HTTP_STATUS.OK)
    }
  } catch (error) {
    apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR)
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
  brandInteractions,
  addSocialMedia,
  getFollowers,
  getFollowing,
  registeration,
  validateOtp,
  setPassword,
  selectUserType,
  selectSubRole
};
