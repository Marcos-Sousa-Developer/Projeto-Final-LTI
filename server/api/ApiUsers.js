const express = require('express');
const router = express.Router(); 
const userController = require('../controllers/UserController');

//Get all users
router.get('/', userController.getAllorSomeUsers)

module.exports = router