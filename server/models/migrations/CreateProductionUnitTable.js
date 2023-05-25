let pool = require('../config/getLocaldbConfig')

const statement = "CREATE TABLE productionUnits ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "name varchar(255) NOT NULL, " +
                  "city varchar(255) NOT NULL, " + 
                  "location varchar(255) NOT NULL, " + 
                  "postal_code varchar(255) NOT NULL, " + 
                  "capacity float NOT NULL, " +  
                  "uid_supplier varchar(100) NOT NULL, " +                  
                  "created_at DATE DEFAULT (CURRENT_DATE), " +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table production units'
    }

    console.log("Table production units created"); 

    process.exit()
});