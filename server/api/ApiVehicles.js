const express = require('express');
const router = express.Router(); 
const vehicleController = require('../controllers/VehicleController');

//Get all vehicles
router.get('/', vehicleController.getAllorSomeVehicles)

//Get vehicle by license_plate
router.get('/:id', vehicleController.getVehicleByID)

//Delete vehicle by license_plate
router.delete('/:id', vehicleController.deleteVehicleByID)

//Add vehicle
router.post('/', vehicleController.insertVehicle)

//Update vehicle by license_plate
router.put('/:id', vehicleController.updateVehicleByID) 

module.exports = router