const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: 'String',
        required :[true, 'url is required.']
    },
    publicId: {
        type: 'String',
        required: true,
    },
    uploadedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    }

})

module.exports = mongoose.Model('image', imageSchema)