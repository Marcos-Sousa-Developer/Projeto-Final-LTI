let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE orderedProduct ( " +
                  "id int NOT NULL AUTO_INCREMENT, " +
                  "order_id int NOT NULL, " +
                  "product_EAN BIGINT NOT NULL, " +
                  "product_owner int NOT NULL, " +
                  "product_buyer int NOT NULL, " +
                  "product_location varchar(255), " +
                  "buyer_location varchar(255), " +
                  "orderDistance_km varchar(255) NOT NULL, " +
                  "price float NOT NULL, " +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table OrderedProduct'
    }

    console.log("Table OrderedProduct created"); 

    process.exit()
});