const express = require('express');
const router = express.Router(); 
const supplierController = require('../controllers/SupplierController');

//Get all suppliers
router.get('/', supplierController.getAllSuppliers)

//Delete supplier by id
router.delete('/(:id)', supplierController.deleteSupplierByID)

module.exports = router