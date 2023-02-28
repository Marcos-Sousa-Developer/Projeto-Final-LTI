let dbConnection = require('./DatabaseController')

/**
 * Async function to get all characteristics and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllCharacteristics = async function (req, res) { 

    const statement = "SELECT * FROM characteristics";

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get all characteristics");
    } 
    
    return res.send(result)
}

/**
 * Async function to delete characteristic by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteCharacteristicByID = async function (req, res) {

    const statement = "DELETE FROM characteristics WHERE id = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the characteristic with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Characteristic with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Characteristic with id " + req.params.id + " has been deleted");
}

/**
 * Async function to insert characteristic and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertCharacteristic = async function (req, res) {

    const data = [req.query.name];

    const statement = "INSERT INTO characteristics (name) VALUES ?";

    let result = await dbConnection(statement, [data]);

    if (result === "error") {
        return res.status(500).json("Not possible to insert this characteristic");
    }

    return res.send("Characteristic has been created");
}

/**
 * Async function to update characteristic by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateCharacteristicByID = async function (req, res) { 

    const statement = `UPDATE characteristics SET name='${req.query.name}' WHERE id='${parseInt(req.params.id)}'`;

    let result = await dbConnection(statement);

    if (result === "error") {
        return res.status(500).json("Not possible to update this characteristic");
    }

    return res.send("Characteristic has been updated");
}

module.exports = {getAllCharacteristics, deleteCharacteristicByID, insertCharacteristic, updateCharacteristicByID}