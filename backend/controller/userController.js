const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const asyncHandler = require('express-async-handler')


const createProfile = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    const err = new Error("Please provide name,email and address");
    return next(err);
  }

  if (password.length < 8) {
    res.status(400);
    const err = new Error("Password must be 8 charcters");
    return next(err);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    res.status(400);
    const err = new Error("Invalid Email Address");
    return next(err);
  }

  try {
    const user = await userModel.create({
      name,
      email,
      password,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        message: "User Profile created sucessfully",
        user
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(400);
      const err = new Error("Email already exists");
      return next(err);
    }
    res.status(500).json({
      message: error.message,
    });
  }
};


const login = asyncHandler(async(req, res, next) => {
    const {email,password} = req.body;

    const checkUserExists = await userModel.findOne({email}) //email validation
    console.log("checkuser",checkUserExists);

    const checkPasswordExists = await checkUserExists.checkPassword(password);
    console.log("checkPassword",checkPasswordExists);
    
    if(checkUserExists && checkPasswordExists){
      generateToken(res,checkUserExists._id);
      res.status(201).json({
        message : "Login Successfully",
        checkUserExists
      })
    }
    else{
      res.status(400);
      throw new Error("Invalid Email or Password")
    }

});

const logout = asyncHandler(async(req, res, next) => {
   res.cookie("token", "",{
    httpOnly : true,
    expires : new Date(),
    })
    res.status(200).json({
      message : "Logged Out Successfully"
    })
});

const getProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (password && password.length < 8) { //check for password if present
    res.status(400); 
    throw new Error("Password must be atleast 8 charecters");
  }

  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }

});



module.exports = { createProfile, login, logout, getProfile, updateProfile };
