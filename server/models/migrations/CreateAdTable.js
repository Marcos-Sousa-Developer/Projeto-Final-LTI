let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE ads ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "title varchar(255) NOT NULL, " +
                  "description varchar(255) NOT NULL, " + 
                  "extraCharacteristic varchar(1000) NOT NULL, " +
                  "status varchar(255) NOT NULL, " +
                  "price float NOT NULL, " +
                  "supplier_id int, " +
                  "product_id int," +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table ads'
    }

    console.log("Table ads created"); 

    process.exit()
});