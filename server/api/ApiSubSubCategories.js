const express = require('express');
const router = express.Router(); 
const subsubcategoryController = require('../controllers/SubSubCategoryController');

//Get all subsubcategories
router.get('/', subsubcategoryController.getAllorSomeSubSubCategories)

//Get subsubcategory by id
router.get('/:id', subsubcategoryController.getSubSubCategoryByID)

//Delete subsubcategory by id
router.delete('/:id', subsubcategoryController.deleteSubSubCategoryByID)

//Add subsubcategory
router.post('/', subsubcategoryController.insertSubSubCategory)

//Update subsubcategory by id
router.put('/:id', subsubcategoryController.updateSubSubCategoryByID) 

module.exports = router