const express = require('express');
const router = express.Router(); 
const characteristicController = require('../controllers/CharacteristicController');

//Get all characteristics
router.get('/', characteristicController.getAllCharacteristics)

//Get characteristic by id
router.get('/:id', characteristicController.getCharacteristic)

//Delete characteristic by id
router.delete('/:id', characteristicController.deleteCharacteristicByID)

//Add characteristic
router.post('/', characteristicController.insertCharacteristic)

//Update characteristic by id
router.put('/:id', characteristicController.updateCharacteristicByID) 

module.exports = router