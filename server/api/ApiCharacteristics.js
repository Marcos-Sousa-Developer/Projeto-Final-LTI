const express = require('express');
const router = express.Router(); 
const characteristicController = require('../controllers/CharacteristicController');

//Get all consumers
router.get('/', characteristicController.getAllCharacteristics)

//Delete consumer by id
router.delete('/:id', characteristicController.deleteCharacteristicByID)

//Add consumer
router.post('/characteristic', characteristicController.insertCharacteristic)

//Update consumer by id
router.put('/:id', characteristicController.updateCharacteristicByID) 

module.exports = router