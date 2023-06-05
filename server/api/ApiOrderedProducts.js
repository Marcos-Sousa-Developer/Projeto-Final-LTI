const express = require('express');
const router = express.Router(); 
const orderedProductController = require('../controllers/OrderedProductController');

//Get all products ordered
router.get('/', orderedProductController.getAllorSomeOrderedProducts)

//Get ordered product by id
router.get('/:id', orderedProductController.getOrderedProductByID)

//Add ordered product
router.post('/', orderedProductController.insertOrderedProduct)

//Update ordered product by id
router.put('/:id', orderedProductController.updateOrderedProductByID) 

//Delete order product by id
router.delete('/:id', orderedProductController.deleteOrderProductByID)

module.exports = router