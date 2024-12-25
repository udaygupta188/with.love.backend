const yup = require('yup');

// Define the schema using Yup
const productSchema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price must be a number'),
});

const styleProductSchema = yup.object({
  productId:yup.string().required('Product is required'),
  styleProducts:yup.array().required('Style products id are required')

})
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

const fileValidation = (req, res, next) => {
  // Check if any file is uploaded
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded.' });
  }

  // Define allowed file types
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

  // Validate each file
  for (let file of req.files) {
    if (!allowedFileTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type. Only images are allowed.' });
    }

    // Check the file size (e.g., max size: 2MB)
    if (file.size > 2 * 1024 * 1024) { // 2MB in bytes
      return res.status(400).json({ error: 'File size exceeds the 2MB limit.' });
    }
  }

  next(); // If validation passes, move to the next middleware
};


module.exports ={ validateProduct, styleProductSchema, fileValidation}
