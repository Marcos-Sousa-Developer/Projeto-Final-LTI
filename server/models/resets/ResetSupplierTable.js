let pool = require('../config/getLocaldbConfig')

const statement = "DELETE FROM suppliers";

pool.query(statement, function(error, result){

    if (error){
        throw error + '\n' + 'Not possible delete data from the table suppliers'
    }

    console.log("Data from the table suppliers deleted");

    process.exit();
});