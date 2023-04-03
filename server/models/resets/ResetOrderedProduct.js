let pool = require('../../config/dbConfigLocal')

const statement = "DELETE FROM orderedProduct";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table OrderedProduct'
    }

    console.log("Data from the table OrderedProduct deleted");

    process.exit();
});