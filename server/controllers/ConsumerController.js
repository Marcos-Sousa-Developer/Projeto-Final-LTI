let dbConnection = require('./DatabaseController') 

/**
 * Async fucntion to get all consumers and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllConsumers = async function (req, res) { 

    const statement = "SELECT * FROM consumers";

    let result = await dbConnection(statement)  


    if(result.includes("error")) {
        return res.status(500).json("Not Possible get all consumers");
    } 
    return res.send(result)

} 

module.exports = {getAllConsumers}