const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'name of the user is required.']
    },
    email : {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
})
const user = mongoose.model('User', userSchema);
module.exports = user;