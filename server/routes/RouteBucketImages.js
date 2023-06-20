const express = require('express');
const router = express.Router(); 
const bucket = require('../controllers/BucketController')

//Sign in user
router.post('/saveProductImages', bucket.saveProductImages) 

module.exports = router