let dbConnection = require('./DatabaseController')

/**
 * Async function to get all or some vehicles and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeVehicles = async function (req, res) { 

    const statement = "SELECT * FROM vehicles";
    
    if(Object.keys(req.query).length !== 0) {
        statement += " WHERE "

        for(let i = 0 ; i < Object.keys(req.query).length; i++) {
            let key = Object.keys(req.query)[i];
            let value = Object.values(req.query)[i]
            let nextKey = Object.keys(req.query)[i+1];
            let nextValue = Object.values(req.query)[i+1]
            
            if(value != ""){
                statement += key;
                statement += `='`;
                statement += value; 
                statement += `'` ;
            }
    
            if(nextKey != undefined && nextValue != ""){
                statement += ` AND ` ;
            }
        }
    }

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
const getVehicleByID = async function (req, res) { 

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

    const statement = `UPDATE vehicles SET `;

    for(let i = 0 ; i < Object.keys(req.query).length; i++) {
        
        let key = Object.keys(req.query)[i];
        let value = Object.values(req.query)[i]
        let nextKey = Object.keys(req.query)[i+1];
        let nextValue = Object.values(req.query)[i+1]
        
        if(value != ""){
            statement += key;
            statement += `='`;
            statement += value; 
            statement += `'` ;
        }

        if(nextKey != undefined && nextValue != ""){
            statement += `, ` ;
        }
    }

    statement += ` WHERE license_plate='${parseInt(req.params.license_plate)}';`;

    let result = await dbConnection(statement);

    if (result === "error") {
        return res.status(500).json("Not possible to update this vehicle");
    }

    return res.send("Vehicle has been updated");
}

module.exports = {getAllorSomeVehicles, getVehicleByID, deleteVehicleByLicensePlate, insertVehicle, updateVehicleByLicensePlate}