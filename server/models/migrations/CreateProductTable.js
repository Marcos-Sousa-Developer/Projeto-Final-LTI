let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE products ( " +
                  "EAN bigint NOT NULL, " +
                  "name varchar(255) NOT NULL, " + 
                  "production_date DATE NOT NULL, " +
                  "description varchar(500) NOT NULL, " +
                  "id_category int, " + //ADD NOT NULL
                  "id_production_unit int, " +
                  "status BOOLEAN DEFAULT 1, " +  
                  "PRIMARY KEY (EAN))";
                  //"PRIMARY KEY (EAN), " +
                  //"FOREIGN KEY (id_category) REFERENCES categories(id), "; 
                  //"FOREIGN KEY (id_production_unit) REFERENCES productionUnits(id))";


pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table products'
    }

    console.log("Table products created"); 

    process.exit()
});