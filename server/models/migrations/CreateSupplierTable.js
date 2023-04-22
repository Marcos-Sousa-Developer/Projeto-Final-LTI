let pool = require('../config/getLocaldbConfig')
const createUserTable = require('./CreateUserTable')

const statement = "CREATE TABLE suppliers ( " +
                  "id int NOT NULL AUTO_INCREMENT, " +
                  "uid varchar(100) NOT NULL, " +
                  "name varchar(255) NOT NULL, " +
                  "email varchar(255) NOT NULL, " +
                  "nif varchar(255), " +
                  "mobile_number varchar(255), " +
                  "continent varchar(255), " +
                  "country varchar(255), " + 
                  "district varchar(255), " +
                  "city varchar(255), " + 
                  "town varchar(255), " + 
                  "address varchar(255), " +
                  "postal_code varchar(255), " + 
                  "status BOOLEAN NOT NULL default 1, " + 
                  "products_list varchar(255), " +
                  "orders varchar(255), " +
                  "created_at DATE DEFAULT (CURRENT_DATE), " +
                  "UNIQUE (email, nif, mobile_number), " +
                  "PRIMARY KEY (id))";    

//AFTER INSERT NEW SUPPLIERS AUTOMATICALY INSERT ON USER TABLE
const trigger_insert = "CREATE TRIGGER add_supplier_to_userTable " + 
                       "After INSERT ON suppliers " + 
                       "FOR EACH ROW " + 
                       "BEGIN " + 
                       "INSERT INTO users (uid, name, email, user_type, id_user_type) VALUES (NEW.uid, NEW.name, NEW.email, 'supplier', NEW.id); " +
                       "END" 
                 
//AFTER INSERT NEW SUPPLIERS AUTOMATICALY INSERT ON USER TABLE
const trigger_delete = "CREATE TRIGGER remove_supplier_to_userTable " + 
                       "After DELETE ON suppliers " + 
                       "FOR EACH ROW " + 
                       "BEGIN " + 
                       "DELETE FROM users WHERE email=OLD.email AND user_type='supplier' AND id_user_type=Old.id; " +
                       "END"

//CREATE SUPPLIERS TABLE
const suppliersTable = () => {
    pool.query(statement, function(error, result) {

        if (error) {
            throw error + '\n' + 'Not possible create table suppliers'
        }

        console.log("Table suppliers created"); 
    });
}

//CREATE INSERT TRIGGER SUPPLIERS
const suppliersTriggerInsert = () => {
    pool.query(trigger_insert, function(error, result) {

        if (error) {
            throw error + '\n' + 'Not possible create triggers for supplier_to_userTable'
        }

        console.log("Trigger insert for supplier_to_userTable created"); 
    });
}

//CREATE DELETE TRIGGER SUPPLIERS
const suppliersTriggerDelete = () => {
    pool.query(trigger_delete, function(error, result) {

        if (error) {
            throw error + '\n' + 'Not possible create triggers for supplier_to_userTable'
        }

        console.log("Trigger delete for supplier_to_userTable created"); 
        
        process.exit()
    });
}

function createSupplierTable() { 

    //CALL USER TABLE IF NOT EXISTS TO ASSOCIATE IN SUPPLIERS TABLE
    createUserTable()

    //CREATE SUPPLIERS TABLE
    suppliersTable()

    //CREATE SUPPLIERS TRIGGER INSERT, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(suppliersTriggerInsert,250)

    //CREATE SUPPLIERS TRIGGER DELETE, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(suppliersTriggerDelete,300)
}

createSupplierTable()