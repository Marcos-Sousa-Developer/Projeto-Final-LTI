const express = require('express');
const router = express.Router(); 
const orderedProductController = require('../controllers/OrderedProductController');

//Get all products ordered
router.get('/', orderedProductController.getAllorSomeOrderedProducts)


module.exports = router