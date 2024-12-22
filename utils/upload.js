const multer = require('multer');

// Set up diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Path where you want to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file if needed
  }
});

// Configure multer to use the custom storage
const upload = multer({
  storage: storage
});

module.exports = { upload };
