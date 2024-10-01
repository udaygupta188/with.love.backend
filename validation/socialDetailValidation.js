const yup = require('yup');

// Define the schema using Yup
const socialDetailSchema = yup.object({
  userId: yup.string().required('user id is required'),
  followers: yup.number().required('Followers must be a number'),
  platform: yup.string().required('Platform is required'),
  socialId: yup.string().required('social id is required'),
});

// Validation middleware
const validateSocialDetail = async (req, res, next) => {
  try {
    // Validate the request body against the schema
    await socialDetailSchema.validate(req.body, { abortEarly: false });
    next(); // Proceed if valid
  } catch (err) {
    // Return errors if validation fails
    return res.status(400).json({ errors: err.errors });
  }
};

module.exports = validateSocialDetail;
