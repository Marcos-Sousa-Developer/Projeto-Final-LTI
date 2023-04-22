let pool = require('../config/getLocaldbConfig') 

const statement = "DROP TABLE IF EXISTS vehicles";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table vehicles'
    }

    console.log("Table vehicles deleted");

    process.exit();
});