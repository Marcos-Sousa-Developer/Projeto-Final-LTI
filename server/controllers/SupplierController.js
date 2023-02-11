const pool = require('../config/dbConfigDocker')

const getAllSuppliers = function (req, res) { 

    const statement = "SELECT * FROM suppliers";

    pool.query(statement, function(error, result){

        if(error){
    
            throw error + '\n' + 'Not possible'
        }
        
        res.send(result)
    });
} 

module.exports = {getAllSuppliers}