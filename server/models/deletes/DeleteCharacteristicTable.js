let pool = require('../../config/dbConfigLocal') 

const statement = "DROP TABLE IF EXISTS characteristics";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table characteristics'
    }

    console.log("Table characteristics deleted");

    process.exit();
});