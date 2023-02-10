let pool = require('../../config/dbConfig')

const statement = "CREATE TABLE users ( " +
            "id int NOT NULL AUTO_INCREMENT, " + 
            "name varchar(255) NOT NULL, " + 
            "email varchar(255) NOT NULL, " +
            "user_type varchar(255) NOT NULL, " +
            "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if(error) {
        throw error + '\n' + 'Not possible create table users'
    }

    console.log("Table users created"); 
    
    process.exit()

});