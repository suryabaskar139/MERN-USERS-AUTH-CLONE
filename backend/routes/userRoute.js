const express = require('express');
const { createProfile, getProfile, updateProfile, login, logout } = require('../controller/userController');

const router = express.Router();

router.post('/',createProfile);
router.get('/profile',getProfile);
router.put('/profile',updateProfile);
router.post('/login',login);
router.post('/logout',logout);

module.exports = router;

