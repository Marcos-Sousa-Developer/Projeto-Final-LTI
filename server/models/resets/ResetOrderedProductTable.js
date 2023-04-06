let pool = require('../../config/dbConfigLocal')

const statement = "DELETE FROM orderedProducts";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table OrderedProducts'
    }

    console.log("Data from the table OrderedProducts deleted");

    process.exit();
});