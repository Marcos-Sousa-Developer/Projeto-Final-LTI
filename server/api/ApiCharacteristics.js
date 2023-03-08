const express = require('express');
const router = express.Router(); 
const characteristicController = require('../controllers/CharacteristicController');

//Get all characteristics
router.get('/', characteristicController.getAllCharacteristics)

//Delete characteristic by id
router.delete('/:id', characteristicController.deleteCharacteristicByID)

//Add characteristic
router.post('/characteristic', characteristicController.insertCharacteristic)

//Update characteristic by id
router.put('/:id', characteristicController.updateCharacteristicByID) 

module.exports = router