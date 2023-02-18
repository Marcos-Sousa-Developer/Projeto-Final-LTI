let pool = require('../../config/dbConfigLocal')

const statement = "DELETE FROM characteristics";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table characteristics'
    }

    console.log("Data from the table characteristics deleted");

    process.exit();
});