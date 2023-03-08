let pool = require('../../config/dbConfigLocal')

const statement = "DELETE FROM supplierProducts";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table supplier products'
    }

    console.log("Data from the table supplier products deleted");

    process.exit();
});