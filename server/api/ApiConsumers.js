const express = require('express');
const router = express.Router(); 
const consumerController = require('../controllers/ConsumerController');

//Get all consumers
router.get('/', consumerController.getAllConsumers)

//Get consumer by id
router.get('/:id', consumerController.getConsumerByID)

//Delete consumer by id
router.delete('/:id', consumerController.deleteConsumerByID)

//Add consumer
router.post('/', consumerController.insertConsumer)

//Update consumer by id
router.put('/:id', consumerController.updateConsumerByID) 

//activate consumer by id 
router.put('/activate/:id', consumerController.activateConsumerByID)

//Deactivate consumer by id 
router.put('/deactivate/:id', consumerController.deactivateConsumerByID)

module.exports = router