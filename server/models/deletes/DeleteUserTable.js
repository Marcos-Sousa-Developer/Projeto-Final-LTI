let pool = require('../../config/dbConfig')

const statement = "DROP TABLE users";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table users'
    }

    console.log("Table users deleted");

    process.exit();
});