const express = require('express');
const router = express.Router(); 
const vehicleController = require('../controllers/VehicleController');

//Get all vehicles
router.get('/', vehicleController.getAllVehicles)

//Delete vehicle by id
router.delete('/:license_plate', vehicleController.deleteVehicleByLicensePlate)

//Add vehicle
router.post('/vehicle', vehicleController.insertVehicle)

//Update vehicle by id
router.put('/:license_plate', vehicleController.updateVehicleByLicensePlate) 

module.exports = router