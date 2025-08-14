const cloudinary = require('../config/cloudinary');

const uploadCloudinary = async(filepath) =>{
    try{
        const result = await cloudinary.uploader.upload(filepath);
        return{
            url: result.secure_url,
            publicId: result.public_id

        }
    }
    catch(error){
        console.error("Error while uploading file to cloudinary.", error);
        throw new Error('Error while uploading image to cloudinary.')
    }
}

module.exports = {uploadCloudinary};