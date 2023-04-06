let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE orders ( " +
                  "id int NOT NULL AUTO_INCREMENT, " +
                  "order_number bigint NOT NULL, " +
                  "order_date DATE NOT NULL, " +
                  "order_status varchar(255) NOT NULL, " +
                  "products_list varchar(255), " +
                  "total_price float NOT NULL, " +
                  "address varchar(255) NOT NULL, " +
                  "total_products int NOT NULL, " +
                  "id_supplier_product int, " +
                  "id_consumer int, " +
                  "id_vehicle int, " +
                  "UNIQUE (order_number), " +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table orders'
    }

    console.log("Table orders created"); 

    process.exit()
});