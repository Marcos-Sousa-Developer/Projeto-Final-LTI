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

    if(result.includes("error")) {
        return res.status(500).json("Not Possible get all suppliers");
    } 
    return res.send(result)


} 

module.exports = {getAllSuppliers}