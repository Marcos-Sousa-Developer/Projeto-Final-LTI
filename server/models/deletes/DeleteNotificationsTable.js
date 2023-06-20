let pool = require('../config/getLocaldbConfig') 

const statement = "DROP TABLE IF EXISTS notifications";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table notifications'
    }

    console.log("Table notifications deleted");

    process.exit();
});