let pool = require('../config/getLocaldbConfig')

const statement = "CREATE TABLE vehicles ( " +
                  "id int NOT NULL AUTO_INCREMENT, " +            
                  "name varchar(255) NOT NULL, " +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table vehicles'
    }

    console.log("Table vehicles created"); 

    process.exit()
});