let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE categories ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "name varchar(255) NOT NULL, " + 
                  "id_subcategory int, " +  //não está no fake data porque se faz update posteriormente
                  "PRIMARY KEY (id), " +
                  "FOREIGN KEY (id_subcategory) REFERENCES categories(id) ON DELETE CASCADE)"; 

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table categories'
    }

    console.log("Table categories created"); 

    process.exit()
});