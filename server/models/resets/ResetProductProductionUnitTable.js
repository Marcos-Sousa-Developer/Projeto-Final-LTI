let pool = require('../../config/dbConfigLocal')

const statement = "DELETE FROM productProductionUnits";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table product production unit'
    }

    console.log("Data from the table product production unit deleted");

    process.exit();
});