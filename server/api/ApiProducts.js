const express = require('express');
const router = express.Router(); 
const productController = require('../controllers/ProductController');

//Get all products
router.get('/', productController.getAllProducts)

//Get product by ean
router.get('/:EAN', productController.getProductByID)

//Delete product by ean
router.delete('/:EAN', productController.deleteProductByEAN)

//Add product
router.post('/', productController.insertProduct)

//Update product by ean
router.put('/:EAN', productController.updateProductByEAN) 

module.exports = router