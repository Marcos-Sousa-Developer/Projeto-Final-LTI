const express = require('express');
const router = express.Router(); 
const productsForSellController = require('../controllers/AdsController');

//Get all admins
router.get('/', productsForSellController.getAllorSomeAds)

module.exports = router