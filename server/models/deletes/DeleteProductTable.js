let pool = require('../../config/dbConfigLocal') 

const statement = "DROP TABLE IF EXISTS products";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table products'
    }

    console.log("Table products deleted");

    process.exit();
});