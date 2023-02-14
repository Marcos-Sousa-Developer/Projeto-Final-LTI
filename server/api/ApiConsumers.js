const express = require('express');
const router = express.Router(); 
const consumerController = require('../controllers/ConsumerController');

//Get all consumers
router.get('/', consumerController.getAllConsumers)

//Delete consumer by id
router.delete('/:id', consumerController.deleteConsumerByID)

//Add consumer
router.post('/user_form', consumerController.insertConsumer)

//Update consumer by id
router.put('/:id', consumerController.updateConsumerByID)

module.exports = router