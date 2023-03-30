let dbConnection = require('./DatabaseController')

/**
 * Async fucntion to get all users and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllAdmins = async function (req, res) { 

    const statement = "SELECT * FROM admins";  
    
    let result = await dbConnection(statement) 
    
    if (result.includes("error")) {
        return res.status(500).json("Not possible to get all admins");
    } 
    
    return res.send(result) 
} 

module.exports = {getAllAdmins}