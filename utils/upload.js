const multer = require('multer');
const path = require('path')
// Set up diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Path where you want to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Rename file if needed
  }
});

const fileFilter = (req, file, cb) =>{
  const ext  = path.extname(file.originalname).toLowerCase();
  console.log(ext,"ext")
  if (ext !== '.jpg' || ext !== '.jpeg') {
    return cb(new Error('Only JPEG/JPG files are allowed'), false);
  }
}

const MAX_FILE_SIZE= 2 * 1024 * 1024;
// Configure multer to use the custom storage
const upload = multer({
  storage: storage,
  // fileFilter:fileFilter,
  limits:MAX_FILE_SIZE
});

module.exports = { upload };
