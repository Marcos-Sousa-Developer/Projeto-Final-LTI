let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE subsubcategories ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "name varchar(255) NOT NULL, " + 
                  "id_subcategory int, " +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table subsubcategories'
    }

    console.log("Table subsubcategories created"); 

    process.exit()
});