const express = require('express');
const router = express.Router(); 
const consumerController = require('../controllers/ConsumerController');

//Get all consumers
router.get('/', consumerController.getAllConsumers)

//Delete consumer by id
router.delete('/(:id)', consumerController.deleteConsumerByID)

module.exports = router