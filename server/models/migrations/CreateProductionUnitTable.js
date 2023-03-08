let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE productionUnits ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "stock int NOT NULL, " + 
                  "location varchar(255) NOT NULL, " + 
                  "capacity float NOT NULL, " +  
                  "id_vehicle int, " +
                  "id_supplier int, " + //ADD NOT NULL
                  "id_product int, " +
                  "PRIMARY KEY (id))";
                  //"PRIMARY KEY (id), " +
                  //"FOREIGN KEY (id_vehicle) REFERENCES vehicles(license_plate), " +
                  //"FOREIGN KEY (id_supplier) REFERENCES suppliers(id), " +
                  //"FOREIGN KEY (id_product) REFERENCES products(id))"; 

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table production units'
    }

    console.log("Table production units created"); 

    process.exit()
});