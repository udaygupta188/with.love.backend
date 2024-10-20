const authService = require('./auth.service');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../utils'); // Importing helper functions

// Controller for user login
const login = async (req, res) => {
  const { emailOrUsername, password, country, device, IP } = req.body;

  try {
    const user = await authService.authenticateUser(emailOrUsername, password, country, device, IP);
    const tokens = await authService.generateTokens(user.user);
    const sessionToken = user.sessionToken;

   // Merge tokens and sessionToken into a single object
   const data = {
    ...tokens,
    sessionToken
  };
    return apiSuccessResponse(res, 'User logged in successfully', data);
  } catch (error) {
    console.error('User Login error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.UNAUTHORIZED);
  }
};

// Controller for admin login
const loginAdmin = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const admin = await authService.authenticateAdmin(emailOrUsername, password);
    const tokens = await authService.generateTokens(admin);
    return apiSuccessResponse(res, 'Admin logged in successfully', tokens);
  } catch (error) {
    console.error('Admin Login error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.UNAUTHORIZED);
  }
};

// Controller to refresh tokens
const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return apiErrorResponse(res, 'No token provided', null, HTTP_STATUS.UNAUTHORIZED);
  }

  try {
    const tokens = await authService.refreshTokens(token);
    return apiSuccessResponse(res, 'Tokens refreshed successfully', tokens);
  } catch (error) {
    console.error('Refresh Token error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.FORBIDDEN);
  }
};

// Controller for logged-in users to request password reset
const forgotPassword = async (req, res) => {
  try {
    const {resetUrl} = req.body;
    if (!resetUrl) {
      return apiErrorResponse(res, 'Reset URL is required.', null, HTTP_STATUS.BAD_REQUEST);
    }
    // Assume `req.user` contains the authenticated user data
    const userId = req.user._id;

    // Call the service function to handle forgot password
    const result = await authService.forgotPassword(userId,resetUrl);

    return apiSuccessResponse(res, result.message, null, HTTP_STATUS.OK);
  } catch (error) {
    console.error('Forgot Password error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};


const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return apiErrorResponse(res, 'Token and new password are required', null, HTTP_STATUS.BAD_REQUEST);
    }

    const result = await authService.resetPassword(token, newPassword);

    return apiSuccessResponse(res, result.message, null, HTTP_STATUS.OK);
  } catch (error) {
    console.error('Reset Password error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};


module.exports = {
  login,
  loginAdmin,
  refreshToken,
  forgotPassword,
  resetPassword
};
