const express = require('express');
const router = express.Router(); 
const adsController = require('../controllers/AdsController');

//Get all ads
router.get('/', adsController.getAllorSomeAds)

//Add ad
router.post('/', adsController.insertAd)

module.exports = router