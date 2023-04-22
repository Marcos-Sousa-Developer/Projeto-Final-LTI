let pool = require('../../config/dbConfig')

const statement = "DROP TABLE IF EXISTS categories";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table categories'
    }

    console.log("Table categories deleted");

    process.exit();
});