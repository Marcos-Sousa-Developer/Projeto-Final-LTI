let dbConnection = require('./DatabaseController')

/**
 * Async function to get all production units and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllProductionUnits = async function (req, res) { 

    const statement = "SELECT * FROM productionUnits";

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get all production units");
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

    const statement = `UPDATE productionUnits SET stock='${req.query.stock}', location='${req.query.location}', capacity='${req.query.capacity}' WHERE id='${parseInt(req.params.id)}'`;

    let result = await dbConnection(statement);

    if (result === "error") {
        return res.status(500).json("Not possible to update this production unit");
    }

    return res.send("Production unit has been updated");
}

module.exports = {getAllProductionUnits, deleteProductionUnitByID, insertProductionUnit, updateProductionUnitByID}