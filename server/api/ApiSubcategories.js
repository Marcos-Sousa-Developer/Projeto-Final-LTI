const express = require('express');
const router = express.Router(); 
const subcategoryController = require('../controllers/SubcategoryController');

//Get all subcategories
router.get('/', subcategoryController.getAllorSomeSubcategories)

//Get subcategory by id
router.get('/:id', subcategoryController.getSubcategoryByID)

//Delete subcategory by id
router.delete('/:id', subcategoryController.deleteSubcategoryByID)

//Add subcategory
router.post('/', subcategoryController.insertSubcategory)

//Update subcategory by id
router.put('/:id', subcategoryController.updateSubcategoryByID) 

module.exports = router