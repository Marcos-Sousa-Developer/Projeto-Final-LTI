const express = require('express');
const router = express.Router(); 
const authenticate = require('../controllers/AuthController');

//Sign in user
router.post('/signIn', authenticate.signIn) 

//register user
router.post('/registerUser', authenticate.registerUser) 

//register user
router.post('/verifyPassword', authenticate.verifyPassword) 

//changePassword
router.post('/changePassword', authenticate.changePassword) 

//delete Account
router.post('/deleteAccount', authenticate.deleteAccount) 

// Log Out 
router.post('/logout', authenticate.logout) 

//Verify user type
router.get('/userType', authenticate.getUserType) 

//Check email exist
router.get('/checkEmail', authenticate.checkEmail) 

module.exports = router