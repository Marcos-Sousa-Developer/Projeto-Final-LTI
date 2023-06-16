const express = require('express');
const router = express.Router(); 
const adsController = require('../controllers/AdsController');

//Get all ads
router.get('/', adsController.getAllorSomeAds)

//Get ad by id
router.get('/:id', adsController.getAdByID)

//Delete ad by id
router.delete('/:id', adsController.deleteAdByID)

//Add ad
router.post('/', adsController.insertAd)

//Update ad by id
router.put('/:id', adsController.updateAdByID) 

//Deactivate consumer by id 
router.put('/deactivate/:id', adsController.deactivateAdByID)

module.exports = router