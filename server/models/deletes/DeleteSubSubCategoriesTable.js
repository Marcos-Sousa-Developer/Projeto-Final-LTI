let pool = require('../../config/dbConfigLocal') 

const statement = "DROP TABLE IF EXISTS subsubcategories";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table subsubcategories'
    }

    console.log("Table subsubcategories deleted");

    process.exit();
});