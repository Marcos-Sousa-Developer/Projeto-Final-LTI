let pool = require('../config/getLocaldbConfig')

const statement = "CREATE TABLE subsubcategories ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "name varchar(255) NOT NULL, " +
                  "characteristics varchar(1000) NOT NULL, " +
                  "id_subcategory int, " +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table subsubcategories'
    }

    console.log("Table subsubcategories created"); 

    process.exit()
});