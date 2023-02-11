let pool = require('../../config/dbConfigLocal') 

const statement = "SELECT * FROM users"

const statement1 = "CREATE TABLE IF NOT EXISTS users ( " +
            "id int NOT NULL AUTO_INCREMENT, " + 
            "name varchar(255) NOT NULL, " + 
            "email varchar(255) NOT NULL, " +
            "user_type varchar(255) NOT NULL, " +
            "PRIMARY KEY (id))";
          
let createUserTable = () => {

    //Verify if table user exists  
    pool.query(statement, function(error, result) {

        if(error) {
            //IF table does not exists, create it
            pool.query(statement1, function(error, result) {
                if(error) {
                    throw error + '\n' + 'Not possible create table users'
                }
                process.exit() 
            });
        } 
        
    });
}  

console.log('IF you want create users, please use consumer, supliers or admin migrations!')
console.log('CTRL+C -> to exit...')

module.exports = createUserTable