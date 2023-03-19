const express = require('express');
const router = express.Router(); 
const vehicleController = require('../controllers/VehicleController');

//Get all vehicles
router.get('/', vehicleController.getAllVehicles)

//Get vehicle by license_plate
router.get('/:license_plate', vehicleController.getVehicle)

//Delete vehicle by license_plate
router.delete('/:license_plate', vehicleController.deleteVehicleByLicensePlate)

//Add vehicle
router.post('/', vehicleController.insertVehicle)

//Update vehicle by license_plate
router.put('/:license_plate', vehicleController.updateVehicleByLicensePlate) 

module.exports = router