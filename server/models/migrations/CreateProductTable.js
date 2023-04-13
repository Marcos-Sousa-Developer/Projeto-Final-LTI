let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE products ( " +
                  "id int NOT NULL AUTO_INCREMENT, " +
                  "EAN BIGINT, " +
                  "production_date DATE NOT NULL, " +
                  "characteristics varchar(1000) NOT NULL, " +
                  "id_subsubcategory int, " +
                  "id_production_unit int, " +
                  "status BOOLEAN DEFAULT 1, " +  
                  "created_at DATE DEFAULT (CURRENT_DATE), " +
                  "UNIQUE(EAN), " +
                  "PRIMARY KEY (id))";


pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table products'
    }

    console.log("Table products created"); 

    process.exit()
});