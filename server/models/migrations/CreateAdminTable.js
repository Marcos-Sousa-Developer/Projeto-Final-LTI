let pool = require('../../config/dbConfig')
const createUserTable = require('./CreateUserTable')

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

//AFTER INSERT NEW ADMINS AUTOMATICALY INSERT ON USER TABLE
const trigger_insert = "CREATE TRIGGER add_admin_to_userTable " + 
                       "After INSERT ON admins " + 
                       "FOR EACH ROW " + 
                       "BEGIN " + 
                       "INSERT INTO users (uid, name, email, user_type, id_user_type) VALUES (NEW.uid, NEW.name, NEW.email, 'admin', NEW.id); " +
                       "END"    
                 
//AFTER INSERT NEW ADMINS AUTOMATICALY DELETE ON USER TABLE
const trigger_delete = "CREATE TRIGGER remove_admin_to_userTable " + 
                       "After DELETE ON admins " + 
                       "FOR EACH ROW " + 
                       "BEGIN " + 
                       "DELETE FROM users WHERE email=OLD.email AND user_type='admin' AND id_user_type=Old.id; " +
                       "END"  


//CREATE ADMIN TABLE
const adminTable = () => {
    
    pool.query(statement, function(error, result) {

        if (error) {
            throw error + '\n' + 'Not possible create table Admin'
        }
    
        console.log("Table admin created"); 
    
    });
}  

//CREATE ADMIN TO USERS INSERT TRIGGER
const adminTriggerInsert = () => {
    pool.query(trigger_insert, function(error, result) {

        if (error) {
            throw error + '\n' + 'Not possible create triggers insert for admin_to_userTable'
        }

        console.log("Trigger insert for admin_to_userTable created"); 
    });
}

//CREATE ADMIN TO USERS DELETE TRIGGER
const adminTriggerDelete = () => {
    pool.query(trigger_delete, function(error, result) {

        if (error) {
            throw error + '\n' + 'Not possible create triggers delete for admin_to_userTable'
        }

        console.log("Trigger delete for admin_to_userTable created"); 
        
        process.exit()
    });
}

function createAdminTable() {

    //CALL USER TABLE IF NOT EXISTS TO ASSOCIATE IN ADMIN TABLE
    createUserTable()

    //CREATE ADMIN TABLE
    adminTable()

    //CREATE ADMIN TRIGGER INSERT, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(adminTriggerInsert,250)

    //CREATE ADMIN TRIGGER DELETE, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(adminTriggerDelete,300)
}

createAdminTable()

