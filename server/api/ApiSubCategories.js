const express = require('express');
const router = express.Router(); 
const subcategoryController = require('../controllers/SubCategoryController');

//Get all subcategories
router.get('/', subcategoryController.getAllorSomeSubCategories)

//Get subcategory by id
router.get('/:id', subcategoryController.getSubCategoryByID)

//Delete subcategory by id
router.delete('/:id', subcategoryController.deleteSubCategoryByID)

//Add subcategory
router.post('/', subcategoryController.insertSubCategory)

//Update subcategory by id
router.put('/:id', subcategoryController.updateSubCategoryByID) 

module.exports = router