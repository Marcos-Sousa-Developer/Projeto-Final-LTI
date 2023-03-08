let pool = require('../../config/dbConfigLocal')

const statement = "DROP TABLE IF EXISTS productionUnits";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table production units'
    }

    console.log("Table production units deleted");

    process.exit();
});