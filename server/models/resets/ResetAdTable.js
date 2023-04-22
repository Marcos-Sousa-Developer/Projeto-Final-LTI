let pool = require('../config/getLocaldbConfig')

const statement = "DELETE FROM ads";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table ads'
    }

    console.log("Data from the table ads deleted");

    process.exit();
});