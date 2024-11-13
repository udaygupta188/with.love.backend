const { sendRegistrationEmail, sendForgotPasswordEmail } = require('../templates/emailTemplates');
const { apiSuccessResponse, apiErrorResponse, HTTP_STATUS } = require('../utils');

const sendTestEmail = async (req, res) => {
  try {
    const { emailType, to, userName, resetUrl } = req.body;

    // Validate input
    if (!emailType || !to) {
      return apiErrorResponse(res, 'Email type and recipient are required', null, HTTP_STATUS.BAD_REQUEST);
    }

    // Send the appropriate email based on type
    switch (emailType) {
      case 'registration':
        await sendRegistrationEmail(to, userName, 1234);
        break;
      case 'forgotPassword':
        if (!resetUrl) {
          return apiErrorResponse(res, 'Reset URL is required for forgot password email', null, HTTP_STATUS.BAD_REQUEST);
        }
        await sendForgotPasswordEmail(to, resetUrl);
        break;
      default:
        return apiErrorResponse(res, 'Invalid email type', null, HTTP_STATUS.BAD_REQUEST);
    }

    return apiSuccessResponse(res, 'Test email sent successfully');
  } catch (error) {
    console.error('Send Test Email error:', error);
    return apiErrorResponse(res, error.message, null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = { sendTestEmail };
