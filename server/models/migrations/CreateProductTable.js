let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE products ( " +
                  "id int NOT NULL AUTO_INCREMENT, " +
                  "EAN BIGINT NOT NULL, " +
                  "name varchar(200) NOT NULL DEFAULT 'Unknown', "+
                  "description varchar(200) NOT NULL, " +
                  "category_name varchar(200) NOT NULL, " +
                  "subcategory_name varchar(200) NOT NULL, " +
                  "subsubcategory_name varchar(200) NOT NULL, " +
                  "default_characteristics varchar(200), " +
                  "status BOOLEAN DEFAULT 1, " + 
                  "created_at DATE DEFAULT (CURRENT_DATE), " + 
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table products'
    }

    console.log("Table products created"); 

    process.exit()
});