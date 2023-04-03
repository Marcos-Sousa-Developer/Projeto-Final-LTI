const express = require('express');
const router = express.Router(); 
const supplierController = require('../controllers/SupplierController');

//Get all suppliers
router.get('/', supplierController.getAllorSomeSuppliers)

//Get supplier by id
router.get('/:id', supplierController.getSupplierByID)

//Delete supplier by id
router.delete('/:id', supplierController.deleteSupplierByID)

//Add supplier
router.post('/', supplierController.insertSupplier)

//Update supplier by id
router.put('/:id', supplierController.updateSupplierByID)

//activate supplier by id 
router.put('/activate/:id', supplierController.activateSupplierByID)

//Deactivate supplier by id 
router.put('/deactivate/:id', supplierController.deactivateSupplierByID)

module.exports = router