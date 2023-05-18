const express = require('express');
const router = express.Router(); 
const productProductionUnitController = require('../controllers/ProductProductionUnitController');

//Get all product production units
router.get('/', productProductionUnitController.getAllorSomeProductProductionUnits)

//Get product production unit by id
router.get('/:id', productProductionUnitController.getProductProductionUnitByID)

//Delete product production unit by id
router.delete('/:id', productProductionUnitController.deleteProductProductionUnitByID)

//Add product production unit
router.post('/', productProductionUnitController.insertProductProductionUnit)

//Update product production unit by id
router.put('/:id', productProductionUnitController.updateProductProductionUnitByID) 

module.exports = router