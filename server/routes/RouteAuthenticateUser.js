const express = require('express');
const router = express.Router(); 
const authenticate = require('../controllers/AuthController');

//Sign in user
router.post('/signIn', authenticate.signIn) 

//Sign up user
router.post('/signUp', authenticate.signUp) 

module.exports = router