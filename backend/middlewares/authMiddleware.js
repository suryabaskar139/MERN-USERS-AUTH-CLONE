const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const checkToken = asyncHandler(async(res,req,next) => {
    let token;
    token = req.cookies.token;
    if(token){
        try{
            const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
            console.log(verifyToken);
            req.user = await userModel.findById(verifyToken.userId).select("-password")
        }
        catch(error){
            res.status(401);
            throw new Error("Invalid token !");
        }
    }

    else{
        res.status(401);
        throw new Error("Unauthorized User!");
    }
})

module.exports = checkToken;