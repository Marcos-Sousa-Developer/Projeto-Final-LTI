let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE suppliers ( " +
            "id int NOT NULL AUTO_INCREMENT, " +
            "name varchar(255) NOT NULL, " +
            "email varchar(255) NOT NULL, " +
            "nif varchar(255) NOT NULL, " +
            "mobile_number varchar(255) NOT NULL, " +
            "address varchar(255) NOT NULL, " +
            "user_type varchar(255) NOT NULL, " +
            "account_status varchar(255) NOT NULL, " +
            "products_list varchar(255), " +
            "orders varchar(255), " +
            "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if(error) {
        throw error + '\n' + 'Not possible create table suppliers'
    }

    console.log("Table suppliers created"); 
    
    process.exit()

});