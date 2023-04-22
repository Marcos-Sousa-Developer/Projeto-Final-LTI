let pool = require('../config/getLocaldbConfig')

const statement = "DROP TABLE IF EXISTS orderedProducts";

pool.query(statement, function(error, result){

    if(error){

        throw error + '\n' + 'Not possible delete table OrderedProducts'
    }

    console.log("Table OrderedProducts deleted");

    process.exit();
});