let pool = require('../config/getLocaldbConfig') 

const statement = "SELECT * FROM users"

const statement1 = "CREATE TABLE IF NOT EXISTS users ( " +
                   "id int NOT NULL AUTO_INCREMENT, " + 
                   "uid varchar(100) NOT NULL, " +  
                   "name varchar(255) NOT NULL, " + 
                   "email varchar(255) NOT NULL, " +
                   "user_type varchar(255) NOT NULL, " +
                   "id_user_type int NOT NULL, " + //id of user_type
                   "PRIMARY KEY (id))";
          
let createUserTable = () => {

    //Verify if table user exists  
    pool.query(statement, function(error, result) {

        if (error) {
            //IF table does not exists, create it
            pool.query(statement1, function(error, result) {
                if(error) {
                    throw error + '\n' + 'Not possible create table users'
                } 
            });
        }        
    });
}  

module.exports = createUserTable