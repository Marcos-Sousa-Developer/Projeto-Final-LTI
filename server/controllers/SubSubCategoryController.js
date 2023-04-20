let dbConnection = require('./DatabaseController')

/**
 * Async function to get all or some subsubcategories and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeSubSubCategories = async function (req, res) { 

    let statement = "SELECT * FROM subsubcategories";
    
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
        return res.status(500).json("Not possible to get all subsubcategories");
    } else if (result.length < 1) {
        return res.send("There is no subsubcategory in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to get subsubcategory by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getSubSubCategoryByID = async function (req, res) { 

    const statement = "SELECT * FROM subsubcategories WHERE id = " + req.params.id

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get subsubcategory with id " + req.params.id);
    } else if (result.length < 1) {
        return res.send("Subsubcategory with id " + req.params.id + " does not exist in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to delete subsubcategory by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteSubSubCategoryByID = async function (req, res) {

    const statement = "DELETE FROM subsubcategories WHERE id = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the subsubcategory with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Subsubcategory with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Subsubcategory with id " + req.params.id + " has been deleted");
}

/**
 * Async function to insert subsubcategory and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertSubSubCategory = async function (req, res) {

    const data = [req.query.name, req.query.characteristics, req.query.id_subcategory];

    const statement = "INSERT INTO subsubcategories (name, characteristics, id_subcategory) " +
                    " VALUES ?";

    let result = await dbConnection(statement, [data]);

    if (result === "error") {
        return res.status(500).json("Not possible to insert this subsubcategory");
    }

    return res.send("Subsubcategory has been created");
}

/**
 * Async function to update subsubcategory by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateSubSubCategoryByID = async function (req, res) { 

    let statement = `UPDATE subsubcategories SET `;

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
        return res.status(500).json("Not possible to update this subsubcategory");
    } else if (result.affectedRows == 0) {
        return res.send("Subsubcategory with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Subsubcategory has been updated");
}

module.exports = {getAllorSomeSubSubCategories, getSubSubCategoryByID, deleteSubSubCategoryByID, insertSubSubCategory, updateSubSubCategoryByID}
