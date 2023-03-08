let pool = require('../../config/dbConfigLocal')

const statement = "DELETE FROM productionUnits";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table production units'
    }

    console.log("Data from the table production units deleted");

    process.exit();
});