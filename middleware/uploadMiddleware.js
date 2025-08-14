const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("File upload initiated:", file);
        console.log("File upload destination:", file);
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' +Date.now() + path.extname(file.originalname));
    }
});     

const checkFileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb('Error: Only image files are allowed!'); 
    }
}

module.exports = multer({
    storage: storage,
    fileFilter: checkFileFilter,
    limits: { fileSize: 20 * 1024 * 1024 }
}); 