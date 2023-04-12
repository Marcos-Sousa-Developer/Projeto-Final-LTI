let dbConnection = require('./DatabaseController')

/**
 * Async function to get all or some products and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeProducts = async function (req, res) { 

    let statement = "SELECT * FROM products";
    
    if(Object.keys(req.query).length !== 0) { 

        let params = {} 

        for(let i = 0 ; i < Object.keys(req.query).length; i++) {
            let key = Object.keys(req.query)[i];
            let value = Object.values(req.query)[i]

            if(value != "" && (key != "created_at_init" && key != "created_at_final")){ 
                params[key] = value
            }

        }

        statement += " WHERE (created_at BETWEEN '" + req.query.created_at_init + "' AND '" + req.query.created_at_final + "')"

        for(let i = 0 ; i < Object.keys(params).length; i++) { 

            let key = Object.keys(params)[i];
            let value = Object.values(params)[i]
            let nextKey = Object.keys(params)[i+1];

            if(i == 0){
                statement += " AND ";
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

    if (result === "error") {
        return res.status(500).json("Not possible to get all products");
    } else if (result.length < 1) {
        return res.send("There is no product in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to get product by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getProductByID = async function (req, res) { 

    const statement = "SELECT * FROM products WHERE id = " + req.params.id;

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get product with ID " + req.params.id);
    } else if (result.length < 1) {
        return res.send("Product with ID " + req.params.id + " does not exist in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to delete product by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteProductByID = async function (req, res) {

    const statement = "DELETE FROM products WHERE ID = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the product with ID " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Product with ID " + req.params.id + " does not exist in the database");
    }

    return res.send("Product with ID " + req.params.id + " has been deleted");
}

/**
 * Async function to insert product and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertProduct = async function (req, res) {

    const data = [req.query.EAN, req.query.name, req.query.production_date, req.query.description, req.query.id_category, req.query.id_production_unit, req.query.status];

    const statement = "INSERT INTO products (EAN, name, production_date, description, id_category, id_production_unit, status) VALUES ?";

    let result = await dbConnection(statement, [data]);

    if (result === "error") {
        return res.status(500).json("Not possible to insert this product");
    }

    return res.send("Product has been created");
}

/**
 * Async function to update product by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateProductByID = async function (req, res) { 

    let statement = `UPDATE products SET `;

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
        return res.status(500).json("Not possible to update this product");
    } else if (result.affectedRows == 0) {
        return res.send("Product with ID " + req.params.id + " does not exist in the database");
    }

    return res.send("Product has been updated");
}

module.exports = {getAllorSomeProducts, getProductByID, deleteProductByID, insertProduct, updateProductByID}