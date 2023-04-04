let dbConnection = require('./DatabaseController')

/**
 * Async function to get all or some production units and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeProductionUnits = async function (req, res) { 

    let statement = "SELECT * FROM productionUnits";
    
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
        return res.status(500).json("Not possible to get all production units");
    } else if (result.length < 1) {
        return res.send("There is no production unit in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to get production unit with id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getProductionUnitByID = async function (req, res) { 

    const statement = "SELECT * FROM productionUnits WHERE id = " + req.params.id

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get production unit with id " + req.params.id);
    } else if (result.length < 1) {
        return res.send("Production unit with id " + req.params.id + " does not exist in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to delete production unit by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteProductionUnitByID = async function (req, res) {

    const statement = "DELETE FROM productionUnits WHERE id = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the production unit with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Production unit with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Production unit with id " + req.params.id + " has been deleted");
}

/**
 * Async function to insert production unit and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertProductionUnit = async function (req, res) {

    const data = [req.query.stock, req.query.location, req.query.capacity];

    const statement = "INSERT INTO productionUnits (stock, location, capacity) VALUES ?";

    let result = await dbConnection(statement, [data]);

    if (result === "error") {
        return res.status(500).json("Not possible to insert this production unit");
    }

    return res.send("Production unit has been created");
}

/**
 * Async function to update production unit by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateProductionUnitByID = async function (req, res) { 

    let statement = `UPDATE productionUnits SET `;

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
        return res.status(500).json("Not possible to update this production unit");
    } else if (result.affectedRows == 0) {
        return res.send("Production unit with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Production unit has been updated");
}

module.exports = {getAllorSomeProductionUnits, getProductionUnitByID, deleteProductionUnitByID, insertProductionUnit, updateProductionUnitByID}