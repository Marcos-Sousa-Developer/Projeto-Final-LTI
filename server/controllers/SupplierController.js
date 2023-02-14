let dbConnection = require('./DatabaseController')

/**
 * Async function to get all suppliers and await from database response
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
 * Async function to delete supplier by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteSupplierByID = async function (req, res) {

    const statement = "DELETE FROM suppliers WHERE id = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the supplier with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Supplier with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Supplier with id " + req.params.id + " has been deleted");
} 

/**
 * Async function to insert supplier and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertSupplier = async function (req, res) {

    const name = req.body.name
    const email = req.body.email
    const nif = req.body.nif
    const mobile_number = req.body.mobile_number
    const address = req.body.address
    const user_type = req.body.user_type
    const account_status = req.body.account_status

    const statement = "INSERT INTO suppliers (name, email, nif, mobile_number, address, user_type, account_status) VALUES ('${name}', '${email}', '${nif}', '${mobile_number}', '${address}', '${user_type}', '${account_status}')"

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to insert this supplier");
    }

    return res.send("Supplier has been created");
}

/**
 * Async function to update supplier by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateSupplierByID = async function (req, res) {

    const id = req.params.id
    const updateData = req.body

    const statement = "UPDATE users SET ? WHERE id = ?"

    let result = await dbConnection(statement, [updateData, id])

    if (result === "error") {
        return res.status(500).json("Not possible to update the supplier with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Supplier with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Supplier with id " + req.params.id + " has been updated");
}

module.exports = {getAllSuppliers, deleteSupplierByID, insertSupplier, updateSupplierByID}