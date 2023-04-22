let pool = require('../../config/dbConfig')

const statement = "CREATE TABLE categories ( " +
                  "id int NOT NULL AUTO_INCREMENT, " +
                  "name varchar(255) NOT NULL, " +
                  "UNIQUE (name), " +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table categories'
    }

    console.log("Table categories created"); 

    process.exit()
});