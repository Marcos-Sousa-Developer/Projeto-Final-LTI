let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE orders ( " +
                  "id int NOT NULL AUTO_INCREMENT, " +
                  "order_number int NOT NULL, " +
                  "order_date DATE NOT NULL, " +
                  "order_status varchar(255) NOT NULL, " +
                  "products_list varchar(255), " +
                  "total float NOT NULL, " +
                  "address varchar(255) NOT NULL, " +
                  "size float NOT NULL, " +
                  "id_supplier_product int, " +
                  "id_consumer int, " + //ADD NOT NULL
                  "id_vehicle int, " + //ADD NOT NULL
                  "UNIQUE (order_number), " +
                  "PRIMARY KEY (id))";
                  //"PRIMARY KEY (id), " +
                  //"FOREIGN KEY (id_supplier_product) REFERENCES supplierProducts(id)," +
                  //"FOREIGN KEY (id_consumer) REFERENCES consumers(id)," +
                  //"FOREIGN KEY (id_vehicle) REFERENCES vehicles(license_plate))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table orders'
    }

    console.log("Table orders created"); 

    process.exit()
});