let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE subcategories ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "name varchar(255) NOT NULL, " + 
                  "characteristics varchar(1000) NOT NULL, " +
                  "id_category int, " +
                  //"UNIQUE (name), " +
                  "PRIMARY KEY (id))"; 

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table subcategories'
    }

    console.log("Table subcategories created"); 

    process.exit()
});