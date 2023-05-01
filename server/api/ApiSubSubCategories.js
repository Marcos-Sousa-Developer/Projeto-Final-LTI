const express = require('express');
const router = express.Router(); 
const subsubcategoryController = require('../controllers/SubSubCategoryController');

//Get all subcategories
router.get('/', subsubcategoryController.getAllorSomeSubSubCategories)

//Get subcategory by id
router.get('/:id', subsubcategoryController.getSubSubCategoryByID)

//Delete subcategory by id
router.delete('/:id', subsubcategoryController.deleteSubSubCategoryByID)

//Add subcategory
router.post('/', subsubcategoryController.insertSubSubCategory)

//Update subcategory by id
router.put('/:id', subsubcategoryController.updateSubSubCategoryByID) 

module.exports = router