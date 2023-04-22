let pool = require('../../config/dbConfig')

const statement = "DROP TABLE IF EXISTS supplierProducts";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table supplierProducts'
    }

    console.log("Table supplierProducts deleted");

    process.exit();
});