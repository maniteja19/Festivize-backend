const jwt = require('jsonwebtoken');

const authMiddleware = (request, response, next) =>{
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]
    console.log(token)

    if(!token){
        return response.status(401).json({
            message: "Access denied. Please login to access this page."
        })
    }

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        request.userInfo = decodedToken;
        next();
    }
    catch(error){
        console.error(error);
        response.status(500).json({
            message : "Internal server error."
        })
    }
}

module.exports = authMiddleware;