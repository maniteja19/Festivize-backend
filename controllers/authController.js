const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registration = async(request, response) => {
    const {name, email, password, role} = request.body;
    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return response.status(404).json({
                message : 'user already exists. Please login.'
            })
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role: role || 'user'
        })
    
        await newUser.save();
        response.status(201).json({
            message: "User is successfully created."
        })
    }
    catch(error){
        console.error(error);
        response.status(500).json({
            message : 'Internal Server error'
        })
    }

}

const login = async(request, response) => {
    const {email, password} = request.body;
    try{
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return response.status(404).json({
                message:'user doesnot exist. Please Register with your email.'
            })
        }
        
        const verifyPassword = await bcrypt.compare(password, existingUser.password);
        if(!verifyPassword){
            return response.status(400).json({
                message: 'Incorrect email/password'
            })
        }
        const accessToken = jwt.sign({
            userId: existingUser._id,
            role : existingUser.role,
            email: existingUser.email
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '15min'
        })
        response.status(200).json({
            message: 'User successfully logged in.',
            accessToken: accessToken
        })
    }
    catch(error){
        console.error(error);
        response.status(500).json({
            message : 'Internal Server error'
        })
    }
}

module.exports = {registration, login}