let dbConnection = require('./DatabaseController')
const jwt = require('../config/jwtConfig')

/**
 * Async function to get all or some product production units and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeProductProductionUnits = async function (req, res) { 

    let statement = "SELECT * FROM productProductionUnits";
    
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
        return res.status(500).json("Not possible to get all product production units");
    } else if (result.length < 1) {
        return res.send("There is no product production unit in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to get product production unit with id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getProductProductionUnitByID = async function (req, res) { 

    const statement = "SELECT * FROM productProductionUnits WHERE id = " + req.params.id

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get product production unit with id " + req.params.id);
    } else if (result.length < 1) {
        return res.send("Product production unit with id " + req.params.id + " does not exist in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to delete product production unit by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteProductProductionUnitByID = async function (req, res) {

    const statement = "DELETE FROM productProductionUnits WHERE id = " + req.params.id

    console.log(statement)

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the product production unit with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Product production unit with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Product production unit with id " + req.params.id + " has been deleted");
}

/**
 * Async function to insert product production unit and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertProductProductionUnit = async function (req, res) {

    const data = [req.query.quantity, req.query.fee, req.query.productionUnit_id,
                req.query.ad_id, req.query.title, req.query.price];

    const statement = "INSERT INTO productProductionUnits (quantity, fee, productionUnit_id, " +
                    "ad_id, title, price) VALUES ?";

    let result = await dbConnection(statement, [data]);

    if (result === "error") {
        return res.status(500).json("Not possible to insert this product production unit");
    }

    return res.send("Product production unit has been created");
}

/**
 * Async function to update product production unit by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateProductProductionUnitByID = async function (req, res) { 

    let statement = `UPDATE productProductionUnits SET `;

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
        return res.status(500).json("Not possible to update this product production unit");
    } else if (result.affectedRows == 0) {
        return res.send("Product production unit with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Product production unit has been updated");
}

module.exports = {getAllorSomeProductProductionUnits, getProductProductionUnitByID, deleteProductProductionUnitByID, insertProductProductionUnit, updateProductProductionUnitByID}