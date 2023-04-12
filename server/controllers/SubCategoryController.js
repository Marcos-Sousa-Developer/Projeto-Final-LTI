let dbConnection = require('./DatabaseController')

/**
 * Async function to get all or some subcategories and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeSubCategories = async function (req, res) { 

    let statement = "SELECT * FROM subcategories";
    
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
        return res.status(500).json("Not possible to get all subcategories");
    } else if (result.length < 1) {
        return res.send("There is no subcategory in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to get subcategory by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getSubCategoryByID = async function (req, res) { 

    const statement = "SELECT * FROM subcategories WHERE id = " + req.params.id

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get subcategory with id " + req.params.id);
    } else if (result.length < 1) {
        return res.send("Subcategory with id " + req.params.id + " does not exist in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to delete subcategory by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteSubCategoryByID = async function (req, res) {

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
const insertSubCategory = async function (req, res) {

    const data = [req.query.name, req.query.characteristics, req.query.id_category];

    const statement = "INSERT INTO subcategories (name, characteristics, id_category) VALUES ?";

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
const updateSubCategoryByID = async function (req, res) { 

    let statement = `UPDATE subcategories SET `;

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
        return res.status(500).json("Not possible to update this subcategory");
    } else if (result.affectedRows == 0) {
        return res.send("Subcategory with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Subcategory has been updated");
}

module.exports = {getAllorSomeSubCategories, getSubCategoryByID, deleteSubCategoryByID, insertSubCategory, updateSubCategoryByID}