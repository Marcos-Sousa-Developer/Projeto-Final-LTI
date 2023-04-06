let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE admins ( " +
                  "id int NOT NULL AUTO_INCREMENT, " +
                  "uid varchar(100) NOT NULL, " +
                  "name varchar(255) NOT NULL, " +
                  "email varchar(255) NOT NULL, " +
                  "mobile_number varchar(255) NOT NULL, " +
                  "address varchar(255) NOT NULL, " +
                  "continent varchar(255) NOT NULL, " +
                  "country varchar(255) NOT NULL, " +
                  "district varchar(255) NOT NULL, " +
                  "city varchar(255) NOT NULL, " +
                  "town varchar(255) NOT NULL, " +
                  "postal_code varchar(255) NOT NULL, " +
                  "status BOOLEAN NOT NULL, " + 
                  "created_at DATE DEFAULT (CURRENT_DATE), " +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table Admin'
    }

    console.log("Table admin created"); 

    process.exit()
});