let dbConnection = require('./DatabaseController')

/**
 * Async function to get all categories and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeCategories = async function (req, res) { 

    const statement = "SELECT * FROM categories";

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
        return res.status(500).json("Not possible to get all categories");
    } 
    
    return res.send(result)
}

/**
 * Async function to get category by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getCategoryByID = async function (req, res) { 

    const statement = "SELECT * FROM categories WHERE id = " + req.params.id

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get category with id " + req.params.id);
    } 
    
    return res.send(result)
}

/**
 * Async function to delete category by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteCategoryByID = async function (req, res) {

    const statement = "DELETE FROM categories WHERE id = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the category with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Category with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Category with id " + req.params.id + " has been deleted");
}

/**
 * Async function to insert category and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertCategory = async function (req, res) {

    const data = [req.query.name];

    const statement = "INSERT INTO categories (name) VALUES ?";

    let result = await dbConnection(statement, [data]);

    if (result === "error") {
        return res.status(500).json("Not possible to insert this category");
    }

    return res.send("Category has been created");
}

/**
 * Async function to update category by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateCategoryByID = async function (req, res) { 

    const statement = `UPDATE categories SET `;

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
        return res.status(500).json("Not possible to update this category");
    }

    return res.send("Category has been updated");
}

module.exports = {getAllorSomeCategories, getCategoryByID, deleteCategoryByID, insertCategory, updateCategoryByID}