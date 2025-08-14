const express = require('express');
const router = express.Router();
const {uploadImage,getAllImages } = require('../controllers/storageController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

router.post('/upload', authMiddleware, 
  uploadMiddleware.single('file'), 
  uploadImage
);
router.get('/images', getAllImages);
module.exports = router;