let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE subsubcategories ( " +
                  "id int NOT NULL, " + 
                  "name varchar(255) NOT NULL, " + 
                  "id_subcategory int, " + //ADD NOT NULL
                  "PRIMARY KEY (id))";
                  //"PRIMARY KEY (id), " +
                  //"FOREIGN KEY (id_category) REFERENCES categories(id))"; 

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table subsubcategories'
    }

    console.log("Table subsubcategories created"); 

    process.exit()
});