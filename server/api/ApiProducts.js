const express = require('express');
const router = express.Router(); 
const productController = require('../controllers/ProductController');

//Get all products
router.get('/', productController.getAllorSomeProducts)

//Get product by id
router.get('/:id', productController.getProductByID)

//Delete product by id
router.delete('/:id', productController.deleteProductByID)

//Add product
router.post('/', productController.insertProduct)

//Update product by id
router.put('/:id', productController.updateProductByID) 

module.exports = router