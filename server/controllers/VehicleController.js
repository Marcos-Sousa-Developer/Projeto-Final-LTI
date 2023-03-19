let dbConnection = require('./DatabaseController')

/**
 * Async function to get all vehicles and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllVehicles = async function (req, res) { 

    const statement = "SELECT * FROM vehicles";

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get all vehicles");
    } 
    
    return res.send(result)
}

/**
 * Async function to get vehicle by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getVehicle = async function (req, res) { 

    const statement = "SELECT * FROM vehicles WHERE license_plate = " + req.params.license_plate

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get vehicle with license plate " + req.params.license_plate);
    }
    
    return res.send(result)
}

/**
 * Async function to delete vehicle by license_plate and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteVehicleByLicensePlate = async function (req, res) {

    const statement = "DELETE FROM vehicles WHERE license_plate = " + req.params.license_plate

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the vehicle with license plate " + req.params.license_plate);
    } else if (result.affectedRows == 0) {
        return res.send("Vehicle with license plate " + req.params.license_plate + " does not exist in the database");
    }

    return res.send("Vehicle with license plate " + req.params.license_plate + " has been deleted");
}

/**
 * Async function to insert vehicle and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertVehicle = async function (req, res) {

    const data = [req.query.license_plate, req.query.status, req.query.capacity];

    const statement = "INSERT INTO vehicles (license_plate, status, capacity) VALUES ?";

    let result = await dbConnection(statement, [data]);

    if (result === "error") {
        return res.status(500).json("Not possible to insert this vehicle");
    }

    return res.send("Vehicle has been created");
}

/**
 * Async function to update vehicle by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateVehicleByLicensePlate = async function (req, res) { 

    const statement = `UPDATE vehicles SET status='${req.query.status}', capacity='${req.query.capacity}' WHERE license_plate='${req.params.license_plate}'`;

    let result = await dbConnection(statement);

    if (result === "error") {
        return res.status(500).json("Not possible to update this vehicle");
    }

    return res.send("Vehicle has been updated");
}

module.exports = {getAllVehicles, getVehicle, deleteVehicleByLicensePlate, insertVehicle, updateVehicleByLicensePlate}