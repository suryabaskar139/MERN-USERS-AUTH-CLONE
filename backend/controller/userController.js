const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");


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

const getProfile = async (req, res, next) => {};
const updateProfile = async (req, res, next) => {};
const login = async (req, res, next) => {};
const logout = async (req, res, next) => {};

module.exports = { createProfile, login, logout, getProfile, updateProfile };
