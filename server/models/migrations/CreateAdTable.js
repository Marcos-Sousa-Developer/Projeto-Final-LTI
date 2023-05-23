let pool = require('../config/getLocaldbConfig')

const statement = "CREATE TABLE ads ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "title varchar(255) NOT NULL, " +
                  "description varchar(255) NOT NULL, " + 
                  "email varchar(255) NOT NULL, " +
                  "mobile_number varchar(255) NOT NULL, " +
                  "extraCharacteristic varchar(1000) NOT NULL, " +
                  "status varchar(255) NOT NULL, " +
                  "price float NOT NULL, " +
                  "production_date DATE NOT NULL, " +
                  "supplier_id int, " +
                  "product_id int, " +
                  "category_name varchar(255) NOT NULL, " +
                  "subcategory_name varchar(255) NOT NULL, " +
                  "subsubcategory_name varchar(255) NOT NULL, " +
                  "created_at DATE DEFAULT (CURRENT_DATE), " +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table ads'
    }

    console.log("Table ads created"); 

    process.exit()
});