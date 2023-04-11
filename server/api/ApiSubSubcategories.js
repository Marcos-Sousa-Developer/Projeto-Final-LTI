const express = require('express');
const router = express.Router(); 
const subsubcategoryController = require('../controllers/SubSubCategoryController');

//Get subcategory by id
router.get('/:id', subsubcategoryController.getSubSubCategoryByID)

module.exports = router