let pool = require('../../config/dbConfigLocal')
const createUserTable = require('./CreateUserTable')

const statement = "CREATE TABLE suppliers ( " +
                  "id int NOT NULL AUTO_INCREMENT, " +
                  "name varchar(255) NOT NULL, " +
                  "email varchar(255) NOT NULL, " +
                  "nif varchar(255) NOT NULL, " +
                  "mobile_number varchar(255) NOT NULL, " +
                  "address varchar(255) NOT NULL, " +
                  "user_type varchar(255) NOT NULL, " +
                  "account_status BOOLEAN NOT NULL, " + //account_status type bool
                  "products_list varchar(255), " +
                  "orders varchar(255), " +
                  "PRIMARY KEY (id))";

//AFTER INSERT NEW SUPPLIERS AUTOMATICALY INSERT ON USER TABLE
const triggers = "CREATE TRIGGER add_supplier_to_userTable " + 
                 "After INSERT ON suppliers " + 
                 "FOR EACH ROW " + 
                 "BEGIN " + 
                 "Declare name  varchar(255); " +
                 "Declare email  varchar(255); " +
                 "Declare user_type  varchar(255); " +
                 "Declare id_user_type  int; " +
                 "Set name = NEW.name; " +
                 "Set email = NEW.email; " +
                 "Set user_type = 'supplier'; " +
                 "Set id_user_type = NEW.id; " +
                 "INSERT INTO users (name, email, user_type, id_user_type) VALUES (name, email, user_type, id_user_type); " +
                 "END"                 

//CREATE SUPPLIERS TABLE
const suppliersTable = () => {
    pool.query(statement, function(error, result) {

        if(error) {
            throw error + '\n' + 'Not possible create table suppliers'
        }

        console.log("Table suppliers created"); 

    });
}

const suppliersTrigger = () => {
    pool.query(triggers, function(error, result) {

        if(error) {
            throw error + '\n' + 'Not possible create triggers for supplier_to_userTable'
        }

        console.log("Triggers for supplier_to_userTable created"); 
        
        process.exit()

    });
}

function createSupplierTable() { 

    //CALL USER TABLE IF NOT EXISTS TO ASSOCIATE IN SUPPLIERS TABLE
    createUserTable()

    //CREATE SUPPLIERS TABLE
    suppliersTable()

    //CREATE SUPPLIERS TRIGGER, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(suppliersTrigger,500)
}

createSupplierTable()