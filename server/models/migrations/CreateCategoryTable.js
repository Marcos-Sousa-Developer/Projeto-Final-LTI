let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE categories ( " +
                  "id int NOT NULL, " +
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