let pool = require('../../config/dbConfigLocal')

const statement = "DROP TABLE IF EXISTS ads";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table ads'
    }

    console.log("Table ads deleted");

    process.exit();
});