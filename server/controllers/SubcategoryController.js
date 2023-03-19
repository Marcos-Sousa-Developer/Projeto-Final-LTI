let dbConnection = require('./DatabaseController')

/**
 * Async function to get all subcategories and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllSubcategories = async function (req, res) { 

    const statement = "SELECT * FROM subcategories";

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get all subcategories");
    } 
    
    return res.send(result)
}

/**
 * Async function to get subcategory by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getSubcategoryByID = async function (req, res) { 

    const statement = "SELECT * FROM subcategories WHERE id = " + req.params.id

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get subcategory with id " + req.params.id);
    } 
    
    return res.send(result)
}

/**
 * Async function to delete subcategory by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteSubcategoryByID = async function (req, res) {

    const statement = "DELETE FROM subcategories WHERE id = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the subcategory with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Subcategory with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Subcategory with id " + req.params.id + " has been deleted");
}

/**
 * Async function to insert subcategory and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertSubcategory = async function (req, res) {

    const data = [req.query.name];

    const statement = "INSERT INTO subcategories (name) VALUES ?";

    let result = await dbConnection(statement, [data]);

    if (result === "error") {
        return res.status(500).json("Not possible to insert this subcategory");
    }

    return res.send("Subcategory has been created");
}

/**
 * Async function to update subcategory by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateSubcategoryByID = async function (req, res) { 

    const statement = `UPDATE subcategories SET name='${req.query.name}' WHERE id='${parseInt(req.params.id)}'`;

    let result = await dbConnection(statement);

    if (result === "error") {
        return res.status(500).json("Not possible to update this subcategory");
    }

    return res.send("Category has been updated");
}

module.exports = {getAllSubcategories, getSubcategoryByID, deleteSubcategoryByID, insertSubcategory, updateSubcategoryByID}