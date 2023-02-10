let pool = require('../../config/dbConfigLocal')

const statement = "DROP TABLE consumers";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table consumers'
    }

    console.log("Table consumers deleted");

    process.exit();
});