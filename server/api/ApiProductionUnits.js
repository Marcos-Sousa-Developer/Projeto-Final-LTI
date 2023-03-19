const express = require('express');
const router = express.Router(); 
const productionUnitController = require('../controllers/ProductionUnitController');

//Get all production units
router.get('/', productionUnitController.getAllProductionUnits)

//Get production unit by id
router.get('/:id', productionUnitController.getProductionUnitByID)

//Delete production unit by id
router.delete('/:id', productionUnitController.deleteProductionUnitByID)

//Add production unit
router.post('/', productionUnitController.insertProductionUnit)

//Update production unit by id
router.put('/:id', productionUnitController.updateProductionUnitByID) 

module.exports = router