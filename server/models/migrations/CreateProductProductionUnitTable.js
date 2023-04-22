let pool = require('../../config/dbConfig')

const statement = "CREATE TABLE productProductionUnits ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "quantity int NOT NULL, " + 
                  "fee float NOT NULL, " +
                  "productionUnit_id int, " + 
                  "ad_id int, " + 
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table product production unit'
    }

    console.log("Table product production unit created"); 

    process.exit()
});