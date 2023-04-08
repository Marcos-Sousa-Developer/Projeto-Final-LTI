let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE ads ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "title varchar(255) NOT NULL, " +
                  "category_name varchar(200) NOT NULL, " +
                  "subcategory_name varchar(200) NOT NULL, " +
                  "subsubcategory_name varchar(200) NOT NULL, " +
                  "description varchar(255) NOT NULL, " + 
                  "extraCharacteristic varchar(1000), " +
                  "status BOOLEAN DEFAULT 1, " + 
                  "price float NOT NULL, " +
                  "supplier_uid varchar(255) NOT NULL, " +
                  "product_id int," +
                  "created_at DATE DEFAULT (CURRENT_DATE), " + 
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table ads'
    }

    console.log("Table ads created"); 

    process.exit()
});