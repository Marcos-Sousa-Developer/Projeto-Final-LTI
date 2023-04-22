let pool = require('../../config/dbConfig')

const statement = "DELETE FROM admins";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table admins'
    }

    console.log("Data from the table admins deleted");

    process.exit();
});