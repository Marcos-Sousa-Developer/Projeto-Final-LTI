let pool = require('../../config/dbConfigLocal')

const statement = "DROP TABLE suppliers";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table suppliers'
    }

    console.log("Table suppliers deleted");

    process.exit();
});