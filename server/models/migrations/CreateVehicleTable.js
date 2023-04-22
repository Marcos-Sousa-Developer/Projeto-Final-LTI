let pool = require('../../config/dbConfig')

const statement = "CREATE TABLE vehicles ( " +
                  "license_plate varchar(255) NOT NULL, " +
                  "name varchar(255) NOT NULL, " +
                  "production_unit varchar(255), " + 
                  "status varchar(255) NOT NULL, " + 
                  "capacity float NOT NULL, " +
                  "orders_list varchar(255), " +
                  "id_production_unit int, " +
                  "created_at DATE DEFAULT (CURRENT_DATE), " +
                  "PRIMARY KEY (license_plate))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table vehicles'
    }

    console.log("Table vehicles created"); 

    process.exit()
});