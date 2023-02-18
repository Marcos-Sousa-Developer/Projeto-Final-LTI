let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE categories ( " +
                  "id int NOT NULL, " + 
                  "name varchar(255) NOT NULL, " + 
                  "id_subcategory int" +
                  "PRIMARY KEY (id)" +
                  "FOREIGN KEY (id_subcategory) REFERENCES categories(id))"; 

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table categories'
    }

    console.log("Table categories created"); 

    process.exit()
});