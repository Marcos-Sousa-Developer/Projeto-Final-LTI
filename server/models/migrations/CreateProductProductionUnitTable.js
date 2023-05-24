let pool = require('../config/getLocaldbConfig')

const statement = "CREATE TABLE productProductionUnits ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "quantity int NOT NULL, " + 
                  "fee float NOT NULL, " +
                  "productionUnit_id int NOT NULL, " + 
                  "ad_id int NOT NULL, " + 
                  "title varchar(255) NOT NULL, " +                 
                  "price float NOT NULL, " +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table product production unit'
    }

    console.log("Table product production unit created"); 

    process.exit()
});