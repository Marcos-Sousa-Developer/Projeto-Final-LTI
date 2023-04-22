let pool = require('../config/getLocaldbConfig') 

const statement = "DROP TABLE IF EXISTS subcategories";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table subcategories'
    }

    console.log("Table subcategories deleted");

    process.exit();
});