let dbConnection = require('./DatabaseController')

/**
 * Async fucntion to get all suppliers and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllSuppliers = async function (req, res) { 

    const statement = "SELECT * FROM suppliers";

    let result = await dbConnection(statement)  

    if (result.includes("error")) {
        return res.status(500).json("Not possible to get all suppliers");
    } 

    return res.send(result)
} 

/**
 * Async fucntion to delete supplier by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteSupplierByID = async function (req, res) {

    const statement = "DELETE FROM suppliers WHERE id = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the supplier " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Supplier with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Supplier with id " + req.params.id + " has been deleted");
} 

module.exports = {getAllSuppliers, deleteSupplierByID}