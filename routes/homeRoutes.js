const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/home',authMiddleware, (request,response)=>{
    response.status(200).json({
        message : "Successfully logged in and landed on homepage."
    })
})

module.exports = router;