let pool = require('../config/getLocaldbConfig')

const statement = "DELETE FROM products";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table products'
    }

    console.log("Data from the table products deleted");

    process.exit();
});