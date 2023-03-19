const express = require('express');
const router = express.Router(); 
const categoryController = require('../controllers/CategoryController');

//Get all categories
router.get('/', categoryController.getAllCategories)

//Get category by id
router.get('/:id', categoryController.getCategoryByID)

//Delete category by id
router.delete('/:id', categoryController.deleteCategoryByID)

//Add category
router.post('/', categoryController.insertCategory)

//Update category by id
router.put('/:id', categoryController.updateCategoryByID) 

module.exports = router