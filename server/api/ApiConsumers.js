const express = require('express');
const router = express.Router(); 
const consumerController = require('../controllers/ConsumerController');

//Get all consumers
router.get('/', consumerController.getAllConsumers)

module.exports = router