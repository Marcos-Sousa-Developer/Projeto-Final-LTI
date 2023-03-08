let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE supplierProducts ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "price float NOT NULL, " +
                  "fee float NOT NULL, " +
                  "supplier_id int, " + //add NOT NULL
                  "product_id int," +
                  "PRIMARY KEY (id))";
                  //"PRIMARY KEY (id), " +
                  //"FOREIGN KEY (supplier_id) REFERENCES suppliers(id), " +
                  //"FOREIGN KEY (product_id) REFERENCES products(id))";"

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table supplier products'
    }

    console.log("Table supplier products created"); 

    process.exit()
});