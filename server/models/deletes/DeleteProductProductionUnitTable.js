let pool = require('../../config/dbConfig')

const statement = "DROP TABLE IF EXISTS productProductionUnits";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table product production unit'
    }

    console.log("Table product production unit deleted");

    process.exit();
});