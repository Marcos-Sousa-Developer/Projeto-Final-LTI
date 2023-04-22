let pool = require('../config/getLocaldbConfig')

const statement = "DELETE FROM users";

pool.query(statement, function(error, result){

    if (error){
        throw error + '\n' + 'Not possible delete data from the table users'
    }

    console.log("Data from the table users deleted");

    process.exit();
});