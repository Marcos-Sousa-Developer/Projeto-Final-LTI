let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE subcategories ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "name varchar(255) NOT NULL, " + 
                  "id_category int, " + //ADD NOT NULL
                  "UNIQUE (name), " +
                  "PRIMARY KEY (id))";
                  //"PRIMARY KEY (id), " +
                  //"FOREIGN KEY (id_category) REFERENCES categories(id))"; 

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table subcategories'
    }

    console.log("Table subcategories created"); 

    process.exit()
});