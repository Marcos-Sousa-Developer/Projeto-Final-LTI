const express = require('express');
const router = express.Router(); 
const productController = require('../controllers/ProductController');

//Get all consumers
router.get('/', productController.getAllProducts)

//Delete consumer by id
router.delete('/:ean', productController.deleteProductByID)

//Add consumer
router.post('/product', productController.insertProduct)

//Update consumer by id
router.put('/:ean', productController.updateProductByID) 

module.exports = router