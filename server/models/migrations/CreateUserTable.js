let pool = require('../../config/dbConfig')

const statement = "CREATE TABLE users ( " +
            "id int, " + 
            "FirstName varchar(255), " + 
            "LastName varchar(255) )";

pool.query(statement, function(error, result) {

    if(error) {
        throw error + '\n' + 'Not possible create table users'
    }

    console.log("Table users created"); 
    
    process.exit()

});