const express = require('express');
const router = express.Router(); 
const categoryController = require('../controllers/CategoryController');

//Get all consumers
router.get('/', categoryController.getAllCategories)

//Delete consumer by id
router.delete('/:id', categoryController.deleteCategoryByID)

//Add consumer
router.post('/category', categoryController.insertCategory)

//Update consumer by id
router.put('/:id', categoryController.updateCategoryByID) 

module.exports = router