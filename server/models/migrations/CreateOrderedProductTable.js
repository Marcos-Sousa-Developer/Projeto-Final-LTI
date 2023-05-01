let pool = require('../config/getLocaldbConfig')

const statement = "CREATE TABLE orderedProducts ( " +
                  "id int NOT NULL AUTO_INCREMENT, " +
                  "order_id int NOT NULL, " +
                  "product_EAN BIGINT NOT NULL, " +
                  "product_category varchar(255) NOT NULL, " +
                  "product_subcategory varchar(255) NOT NULL, " +
                  "product_subsubcategory varchar(255) NOT NULL, " +
                  "product_owner_uid int NOT NULL, " +
                  "product_buyer_uid int NOT NULL, " +
                  "product_location varchar(255) NOT NULL, " +
                  "buyer_location varchar(255) NOT NULL, " +
                  "orderDistance_km varchar(255) NOT NULL, " +
                  "sameLocation varchar(255) NOT NULL, " +
                  "price float NOT NULL, " +
                  "created_at DATE DEFAULT (CURRENT_DATE), " +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table OrderedProducts'
    }

    console.log("Table OrderedProducts created"); 

    process.exit()
});