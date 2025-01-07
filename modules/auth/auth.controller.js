const authService = require('./auth.service');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../../utils'); // Importing helper functions
const { User } = require('../user/userProfile/userProfile.model');

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

// controller for google Login
const googleLogin = async (req, res) => {
  const { access_token } = req.body;
  console.log(access_token, "access_token", req.body)
  try {
       // Fetch user information from Google API using access token
       const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        },
      });

    // Parse the response as JSON
    const ress = await response.json();
      // Check if Google API response is valid
      if (!response.ok || !ress.email) {
        return apiErrorResponse(res, 'Invalid Google token or email not found', null, HTTP_STATUS.UNAUTHORIZED);
      } // Check if user exists in the database by email
      let user = await User.findOne({ email: ress.email });
      
      // If user doesn't exist, create a new user
      if (!user) {
        const randomPassword = (Math.random() + 1).toString(36).substring(7); // Generating a random password
        const hashedPassword = await bcrypt.hash(randomPassword, 10);  // Hash the random password
        
        user = new User({
          email: ress.email,
          password: hashedPassword,  // Save the hashed password (even though it may not be used)
        });
  
        await user.save();
      }
  
      // Generate tokens for the user
      const tokens = await authService.generateTokens(user);
  
      // Assuming sessionToken is generated somewhere in the user object
      const sessionToken = user.sessionToken || '';
  
      // Prepare data to send in response
      const data = {
        ...tokens,
        sessionToken,
      };
  
      return apiSuccessResponse(res, 'User logged in successfully', data, HTTP_STATUS.OK);
  
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
    const { resetUrl } = req.body;
    if (!resetUrl) {
      return apiErrorResponse(res, 'Reset URL is required.', null, HTTP_STATUS.BAD_REQUEST);
    }
    // Assume `req.user` contains the authenticated user data
    const userId = req.user._id;

    // Call the service function to handle forgot password
    const result = await authService.forgotPassword(userId, resetUrl);

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
  googleLogin,
  loginAdmin,
  refreshToken,
  forgotPassword,
  resetPassword
};
