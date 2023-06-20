let dbConnection = require('./DatabaseController')
const { v4: uuidv4 } = require('uuid');


/**
 * Async function to get all or some vehicles and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeVehicles = async function (req, res) { 

    let statement = "SELECT * FROM vehicles";
    
    if(Object.keys(req.query).length !== 0) { 
        statement += " WHERE "

        let params = {} 

        for(let i = 0 ; i < Object.keys(req.query).length; i++) {
            let key = Object.keys(req.query)[i];
            let value = Object.values(req.query)[i]

            if(value != "" && (key != "created_at_init" && key != "created_at_final")){ 
                params[key] = value
            }

        }

        if (req.query.created_at_init != undefined && req.query.created_at_final != undefined){
            statement += "(created_at BETWEEN '" + req.query.created_at_init + "' AND '" + req.query.created_at_final + "')"
            if(Object.keys(params).length > 0){
                statement += " AND ";
            }
        }

        for(let i = 0 ; i < Object.keys(params).length; i++) { 

            let key = Object.keys(params)[i];
            let value = Object.values(params)[i]
            let nextKey = Object.keys(params)[i+1];

            if(i == 0){
                statement += " AND ";
            }

            statement += key;
            statement += `='`;
            statement += value; 
            statement += `'` ;

            if(nextKey != undefined){
                statement += ` AND ` ;
            }
        }
    }

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get all vehicles");
    } else if (result.length < 1) {
        return res.send("There is no vehicle in the database");
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

    const statement = "SELECT * FROM vehicles WHERE id = " + req.params.id

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get vehicle with id " + req.params.id);
    } else if (result.length < 1) {
        return res.send("Vehicle with id " + req.params.id + " does not exist in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to delete vehicle by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteVehicleByID = async function (req, res) {

    const statement = "DELETE FROM vehicles WHERE id = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the vehicle with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Vehicle with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Vehicle with id " + req.params.id + " has been deleted");
}

/**
 * Async function to insert vehicle and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertVehicle = async function (req, res) {

    const data = [req.query.name, uuidv4(), uuidv4().substring(0, 6)];

    const statement = "INSERT INTO vehicles (name, credentialAccess, accessCode) VALUES ?";

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
const updateVehicleByID = async function (req, res) { 

    let statement = `UPDATE vehicles SET `;

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

    statement += ` WHERE id='${parseInt(req.params.id)}';`;

    let result = await dbConnection(statement);

    if (result === "error") {
        return res.status(500).json("Not possible to update this vehicle");
    } else if (result.affectedRows == 0) {
        return res.send("Vehicle with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Vehicle has been updated");
}

module.exports = {getAllorSomeVehicles, getVehicleByID, deleteVehicleByID, insertVehicle, updateVehicleByID}