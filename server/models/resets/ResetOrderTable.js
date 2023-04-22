let pool = require('../config/getLocaldbConfig')

const statement = "DELETE FROM orders";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table orders'
    }

    console.log("Data from the table orders deleted");

    process.exit();
});