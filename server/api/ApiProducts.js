const express = require('express');
const router = express.Router(); 
const productController = require('../controllers/ProductController');

//Get all products
router.get('/', productController.getAllProducts)

//Delete product by id
router.delete('/:EAN', productController.deleteProductByEAN)

//Add product
router.post('/product', productController.insertProduct)

//Update product by id
router.put('/:EAN', productController.updateProductByEAN) 

module.exports = router