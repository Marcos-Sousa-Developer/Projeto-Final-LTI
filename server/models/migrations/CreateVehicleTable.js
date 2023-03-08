let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE vehicles ( " +
                  "license_plate varchar(255) NOT NULL, " + 
                  "status varchar(255) NOT NULL, " + 
                  "capacity float NOT NULL, " +
                  "orders_list varchar(255), " +
                  "id_production_unit int, " + //add NOT NULL
                  "PRIMARY KEY (license_plate))";
                  //"PRIMARY KEY (license_plate), " +
                  //"FOREIGN KEY (id_production_unit) REFERENCES productionUnits(id))"; 

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table vehicles'
    }

    console.log("Table vehicles created"); 

    process.exit()
});