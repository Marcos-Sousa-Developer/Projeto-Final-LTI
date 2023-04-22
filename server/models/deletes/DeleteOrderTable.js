let pool = require('../../config/dbConfig')

const statement = "DROP TABLE IF EXISTS orders";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table orders'
    }

    console.log("Table orders deleted");

    process.exit();
});