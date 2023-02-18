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

module.exports = router