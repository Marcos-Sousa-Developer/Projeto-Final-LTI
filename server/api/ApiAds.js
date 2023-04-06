const express = require('express');
const router = express.Router(); 
const productsForSellController = require('../controllers/ProductsForSellController');

//Get all admins
router.get('/', productsForSellController.getAllorSomeAds)

module.exports = router