let pool = require('../../config/dbConfigLocal')

const statement = "DROP TABLE IF EXISTS supplierProducts";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table supplier products'
    }

    console.log("Table supplier products deleted");

    process.exit();
});