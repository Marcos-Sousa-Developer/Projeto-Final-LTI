let pool = require('../../config/dbConfigLocal')

const statement = "DELETE FROM vehicles";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table vechicles'
    }

    console.log("Data from the table vechicles deleted");

    process.exit();
});