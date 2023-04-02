let dbConnection = require('./DatabaseController')

/**
 * Async function to get all consumers and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeConsumers = async function (req, res) { 

    let statement = "SELECT * FROM consumers";

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
        return res.status(500).json("Not possible to get all consumers");
    } 
    
    return res.send(result)
}

/**
 * Async function to get consumer by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getConsumerByID = async function (req, res) { 

    const statement = "SELECT * FROM consumers WHERE id = " + req.params.id

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get consumer with id " + req.params.id);
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

    const data = [req.query.uid, req.query.name, req.query.email, req.query.nif, 
                req.query.mobile_number, req.query.continent,
                req.query.country,req.query.district,
                req.query.city, req.query.town, req.query.address,
                req.query.postal_code];

    const statement = "INSERT INTO consumers (uid, name, email, nif, mobile_number, continent, country, district, " +
                    "city, town, address, postal_code) VALUES ?";
 
    let result = await dbConnection(statement, [data]);

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

    let statement = `UPDATE consumers SET `

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
        return res.status(500).json("Not possible to update this consumer");
    }

    return res.send("Consumer has been updated");
}

/**
 * Async function to activate consumer by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const activateConsumerByID = async function (req, res) { 

    const statement = `UPDATE consumers SET status='${req.query.account_status}' WHERE id='${parseInt(req.params.id)}'`;

    let result = await dbConnection(statement); 

    if (result === "error") {
        return res.status(500).json("Not possible to activate this consumer");
    }

    return res.send("Consumer has been activated");
}

/**
 * Async function to deactivate consumer by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deactivateConsumerByID = async function (req, res) { 

    const statement = `UPDATE consumers SET status='${req.query.account_status}' WHERE id='${parseInt(req.params.id)}'`;

    let result = await dbConnection(statement);

    if (result === "error") {
        return res.status(500).json("Not possible to deactivate this consumer");
    }

    return res.send("Consumer has been deactivated");
}

module.exports = {getAllorSomeConsumers, getConsumerByID, deleteConsumerByID, insertConsumer, updateConsumerByID, deactivateConsumerByID, activateConsumerByID}