let dbConnection = require('./DatabaseController')
const jwt = require('../config/jwtConfig')

/**
 * Async function to get all or some consumers and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeConsumers = async function (req, res) { 

    let statement = "SELECT * FROM consumers";

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

            if(key == "uid" && value === 'true'){
                const uid_encrypt = req.cookies.userSession;
                value = jwt.decryptID(uid_encrypt);
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

    if (result.includes("error")) {
        return res.status(500).json("Not possible to get all consumers");
    } else if (result.length < 1) {
        return res.send("There is no consumer in the database");
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
    } else if (result.length < 1) {
        return res.send("Consumer with id " + req.params.id + " does not exist in the database");
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
                req.query.country, req.query.district,
                req.query.city, req.query.town, req.query.address,
                req.query.postal_code, req.query.status, req.query.shopping_cart, 
                req.query.total_orders, req.query.created_at];

    const statement = "INSERT INTO consumers (uid, name, email, nif, mobile_number, " +
                    "continent, country, district, city, town, address, postal_code, " +
                    "status, shopping_cart, total_orders, created_at) VALUES ?";
 
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

    let statement = `UPDATE consumers SET `;

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
    } else if (result.affectedRows == 0) {
        return res.send("Consumer with id " + req.params.id + " does not exist in the database");
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
    
    let statement = `UPDATE consumers SET status='1' WHERE id='${parseInt(req.params.id)}'`;

    if (req.query.account_status != undefined) {
        statement = `UPDATE consumers SET status='${req.query.account_status}' WHERE id='${parseInt(req.params.id)}'`;
    }

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

    let statement = `UPDATE consumers SET status=0 WHERE id='${parseInt(req.params.id)}'`;

    if (req.query.account_status != undefined) {
        statement = `UPDATE consumers SET status='${req.query.account_status}' WHERE id='${parseInt(req.params.id)}'`;
    }

    let result = await dbConnection(statement);

    if (result === "error") {
        return res.status(500).json("Not possible to deactivate this consumer");
    }

    return res.send("Consumer has been deactivated");
}

module.exports = {getAllorSomeConsumers, getConsumerByID, deleteConsumerByID, insertConsumer, updateConsumerByID, deactivateConsumerByID, activateConsumerByID}