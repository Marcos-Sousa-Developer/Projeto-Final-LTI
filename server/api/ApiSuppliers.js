const express = require('express');
const router = express.Router(); 
const supplierController = require('../controllers/SupplierController');

//Get all suppliers
router.get('/', supplierController.getAllSuppliers)

//Delete supplier by id
router.delete('/:id', supplierController.deleteSupplierByID)

//Add supplier
router.post('/supplier', supplierController.insertSupplier)

//Update supplier by id
router.put('/:id', supplierController.updateSupplierByID)

//activate supplier by id 
router.put('/activate/:id', supplierController.activateSupplierByID)

//Deactivate supplier by id 
router.put('/deactivate/:id', supplierController.deactivateSupplierByID)

module.exports = router