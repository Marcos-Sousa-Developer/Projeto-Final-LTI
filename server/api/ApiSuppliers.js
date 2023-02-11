const express = require('express');
const router = express.Router(); 
const supplierController = require('../controllers/SupplierController');

router.get('/', supplierController.getAllSuppliers)

module.exports = router