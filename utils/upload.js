const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create upload directory if not exists
const createUploadFolder = (folder) => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }
};

// Common Multer function for different upload folders
const upload = (uploadPath = 'uploads', fileSizeMB = 5) => {
    // Ensure upload folder exists
    createUploadFolder(uploadPath);

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname)); // file.ext
        }
    });

    const fileFilter = (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|svg|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    };

    return multer({
        storage,
        limits: { fileSize: fileSizeMB * 1024 * 1024 }, // MB
        fileFilter
    });
};

module.exports = upload;
