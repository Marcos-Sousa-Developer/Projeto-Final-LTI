const express = require('express');
const router = express.Router(); 
const adminController = require('../controllers/AdminController');

//Get all admins
router.get('/', adminController.getAllorSomeAdmins)

router.put('/:id', adminController.updateAdminByID)

module.exports = router