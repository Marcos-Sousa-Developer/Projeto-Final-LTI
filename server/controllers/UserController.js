let pool = require('../config/dbConfig');

const getAllUsers = function (req, res) {
    const statement = "SELECT * FROM users";

    pool.query(statement, function(error, result){

        if(error){
    
            throw error + '\n' + 'Not possible'
        }
    
        res.json(result);
        //console.log(result);
    });
}

module.exports = {getAllUsers}