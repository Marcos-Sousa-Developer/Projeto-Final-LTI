let pool = require('../config/getLocaldbConfig')

const statement = "DELETE FROM categories";

pool.query(statement, function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible delete data from the table categories'
    }

    console.log("Data from the table categories deleted");

    process.exit();
});