let dbConnection = require('./DatabaseController')

/**
 * Async function to get all products and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllProducts = async function (req, res) { 

    const statement = "SELECT * FROM products";

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get all products");
    } 
    
    return res.send(result)
}

/**
 * Async function to get product by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getProduct = async function (req, res) { 

    const statement = "SELECT * FROM products WHERE EAN = " + req.params.EAN;

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get product with EAN " + req.params.EAN);
    } 
    
    return res.send(result)
}

/**
 * Async function to delete product by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteProductByEAN = async function (req, res) {

    const statement = "DELETE FROM products WHERE EAN = " + req.params.EAN

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the product with EAN " + req.params.EAN);
    } else if (result.affectedRows == 0) {
        return res.send("Product with EAN " + req.params.EAN + " does not exist in the database");
    }

    return res.send("Product with EAN " + req.params.EAN + " has been deleted");
}

/**
 * Async function to insert product and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertProduct = async function (req, res) {

    const data = [req.query.EAN, req.query.name, req.query.production_date, req.query.description];

    const statement = "INSERT INTO products (EAN, name, production_date, description) VALUES ?";

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
const updateProductByEAN = async function (req, res) { 

    const statement = `UPDATE products SET name='${req.query.name}', production_date='${req.query.production_date}', description='${req.query.description}' WHERE EAN='${parseInt(req.params.EAN)}'`;

    let result = await dbConnection(statement);

    if (result === "error") {
        return res.status(500).json("Not possible to update this product");
    }

    return res.send("Product has been updated");
}

module.exports = {getAllProducts, getProduct, deleteProductByEAN, insertProduct, updateProductByEAN}