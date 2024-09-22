const yup = require('yup');

// Define the schema using Yup
const productSchema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price must be a number'),
  brand: yup.string().required('Brand is required'),
  influencer: yup.string().required('Influencer is required'),
});

// Validation middleware
const validateProduct = async (req, res, next) => {
  try {
    // Validate the request body against the schema
    await productSchema.validate(req.body, { abortEarly: false });
    next(); // Proceed if valid
  } catch (err) {
    // Return errors if validation fails
    return res.status(400).json({ errors: err.errors });
  }
};

module.exports = validateProduct;
