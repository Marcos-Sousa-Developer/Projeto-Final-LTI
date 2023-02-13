let pool = require('../../config/dbConfigLocal')

const statement = "DELETE FROM consumers";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table consumers'
    }

    console.log("Data from the table consumers deleted");

    process.exit();
});