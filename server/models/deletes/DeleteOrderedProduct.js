let pool = require('../../config/dbConfigLocal')

const statement = "DROP TABLE IF EXISTS orderedProduct";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table OrderedProduct'
    }

    console.log("Table OrderedProduct deleted");

    process.exit();
});