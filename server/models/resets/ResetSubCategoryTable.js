let pool = require('../../config/dbConfig')

const statement = "DELETE FROM subcategories";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table subcategories'
    }

    console.log("Data from the table subcategories deleted");

    process.exit();
});