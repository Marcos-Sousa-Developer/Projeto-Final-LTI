let dbConnection = require('./DatabaseController')

/**
 * Async function to get all consumers and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllConsumers = async function (req, res) { 

    const statement = "SELECT * FROM consumers";

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get all consumers");
    } 
    
    return res.send(result)
} 

/**
 * Async function to delete consumer by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteConsumerByID = async function (req, res) {

    const statement = "DELETE FROM consumers WHERE id = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the consumer with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Consumer with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Consumer with id " + req.params.id + " has been deleted");
} 

/**
 * Async function to insert consumer and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertConsumer = async function (req, res) {

    const name = req.body.name
    const email = req.body.email
    const nif = req.body.nif
    const mobile_number = req.body.mobile_number
    const address = req.body.address
    const account_status = req.body.account_status

    const statement = "INSERT INTO consumers (name, email, nif, mobile_number, address, account_status) VALUES ('${name}', '${email}', '${nif}', '${mobile_number}', '${address}', '${account_status}')"

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to insert this consumer");
    }

    return res.send("Consumer has been created");
}

/**
 * Async function to update consumer by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateConsumerByID = async function (req, res) {

    const id = req.params.id
    const updateData = req.body

    const statement = "UPDATE users SET ? WHERE id = ?"

    let result = await dbConnection(statement, [updateData, id])

    if (result === "error") {
        return res.status(500).json("Not possible to update the consumer with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Consumer with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Consumer with id " + req.params.id + " has been updated");
}

module.exports = {getAllConsumers, deleteConsumerByID, insertConsumer, updateConsumerByID}