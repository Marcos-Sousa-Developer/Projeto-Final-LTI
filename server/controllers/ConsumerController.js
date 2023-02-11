const pool = require('../config/dbConfigDocker')

const getAllConsumers = function (req, res) { 

    const statement = "SELECT * FROM consumers";

    pool.query(statement, function(error, result){

        if(error){
    
            throw error + '\n' + 'Not possible'
        }
        
        res.send(result)
    });
} 

module.exports = {getAllConsumers}