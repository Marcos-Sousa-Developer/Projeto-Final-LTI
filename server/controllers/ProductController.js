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
 * Async function to delete product by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteProductByID = async function (req, res) {

    const statement = "DELETE FROM products WHERE EAN = " + req.params.ean

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the product with ean " + req.params.ean);
    } else if (result.affectedRows == 0) {
        return res.send("Product with EAN " + req.params.ean + " does not exist in the database");
    }

    return res.send("Product with EAN " + req.params.ean + " has been deleted");
}

/**
 * Async function to insert product and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertProduct = async function (req, res) {

    const data = [req.query.ean, req.query.name, req.query.data_producao, req.query.descricao];

    const statement = "INSERT INTO products (EAN, name, data_producao, descricao) VALUES ?";

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

    const statement = `UPDATE products SET name='${req.query.name}', data_producao='${req.query.data_producao}', descricao='${req.query.descricao}' WHERE EAN='${parseInt(req.params.ean)}'`;

    let result = await dbConnection(statement);

    if (result === "error") {
        return res.status(500).json("Not possible to update this product");
    }

    return res.send("Product has been updated");
}

module.exports = {getAllProducts, deleteProductByID, insertProduct, updateProductByID}