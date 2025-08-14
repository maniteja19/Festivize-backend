const image = require('../models/image');
const { uploadCloudinary } = require('../helper/cloudinaryHelper');
const fs = require('fs');
const uploadImage = async (request, response) => {
  try {
    const { file } = request;
    if (!file) {
      return response.status(400).json({ message: 'No file uploaded' });
    }

    const cloudinaryResult = await uploadCloudinary(file.path);
    if (!cloudinaryResult || !cloudinaryResult.url) {
      return response.status(500).json({ message: 'Failed to upload image to cloudinary' });
    }   
    
    const newImage = new image({
      url: file.url || cloudinaryResult.url,
      publicId: file.filename,
      uploadedBy: request.userInfo.userId
    });

    await newImage.save();

    //delete the local file after uploading to cloudinary
    fs.unlinkSync(file.path);

    response.status(201).json({
      message: 'Image uploaded successfully',
      data: newImage,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error', error: error });
  }
}

const getAllImages = async (request, response) => {
  try {
    const images = await image.find().populate('uploadedBy', 'name email -_id');
    response.status(200).json({
      message: 'Images fetched successfully',
      data: images,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error', error: error });
  }
}

module.exports = {  uploadImage,getAllImages };