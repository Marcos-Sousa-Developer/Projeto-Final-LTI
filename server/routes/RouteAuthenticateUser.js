const express = require('express');
const router = express.Router(); 
const authenticate = require('../controllers/AuthController');

//Sign in user
router.post('/signIn', authenticate.signIn) 

router.post('/registerUser', authenticate.registerUser) 

// Log Out 
router.post('/logout', authenticate.logout) 


//Verify user type
router.get('/userType', authenticate.getUserType) 

module.exports = router