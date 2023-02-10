const pool = require('../config/dbConfigDocker')

const getAllUsers = function (req, res) { 

    const statement = "SELECT * FROM users";

    pool.query(statement, function(error, result){

        if(error){
    
            throw error + '\n' + 'Not possible'
        }
        
        res.send(result)
        //res.json(result);
        //console.log(result);
    });
} 

module.exports = {getAllUsers}