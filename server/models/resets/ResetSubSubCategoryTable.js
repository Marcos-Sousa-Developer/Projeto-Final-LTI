let pool = require('../../config/dbConfig')

const statement = "DELETE FROM subsubcategories";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table subsubcategories'
    }

    console.log("Data from the table subsubcategories deleted");

    process.exit();
});