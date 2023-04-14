let pool = require('../../config/dbConfigLocal')
const createUserTable = require('./CreateUserTable')

const statement = "CREATE TABLE consumers ( " +
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
                  "shopping_cart varchar(255), " +
                  "total_orders int NOT NULL DEFAULT 0, " + //add NOT NULL     Coloquei assim, em vez de encomendas recebidas e por receber, porque depois podemos ir ver ao status da encomenda
                  "created_at DATE DEFAULT (CURRENT_DATE), " +
                  "UNIQUE (email, nif, mobile_number), " +
                  "PRIMARY KEY (id))"; 

//AFTER INSERT NEW CONSUMERS AUTOMATICALY INSERT ON USER TABLE
const trigger_insert = "CREATE TRIGGER add_consumer_to_userTable " + 
                       "After INSERT ON consumers " + 
                       "FOR EACH ROW " + 
                       "BEGIN " + 
                       "INSERT INTO users (uid, name, email, user_type, id_user_type) VALUES (NEW.uid, NEW.name, NEW.email, 'consumer', NEW.id); " +
                       "END"    
                 
//AFTER INSERT NEW CONSUMERS AUTOMATICALY INSERT ON USER TABLE
const trigger_delete = "CREATE TRIGGER remove_consumer_to_userTable " + 
                       "After DELETE ON consumers " + 
                       "FOR EACH ROW " + 
                       "BEGIN " + 
                       "DELETE FROM users WHERE email=OLD.email AND user_type='consumer' AND id_user_type=Old.id; " +
                       "END"                 

//CREATE CONSUMER TABLE
const consumerTable = () => {
    
        pool.query(statement, function(error, result) {

        if (error) {
            throw error + '\n' + 'Not possible create table consumers'
        }

        console.log("Table consumers created"); 
    });
}

//CREATE CONSUMER TO USERS INSERT TRIGGER
const consumerTriggerInsert = () => {
    pool.query(trigger_insert, function(error, result) {

        if (error) {
            throw error + '\n' + 'Not possible create triggers insert for consumer_to_userTable'
        }

        console.log("Trigger insert for consumer_to_userTable created"); 
    });
}

//CREATE CONSUMER TO USERS DELETE TRIGGER
const consumerTriggerDelete = () => {
    pool.query(trigger_delete, function(error, result) {

        if (error) {
            throw error + '\n' + 'Not possible create triggers delete for consumer_to_userTable'
        }

        console.log("Trigger delete for consumer_to_userTable created"); 
        
        process.exit()
    });
}

function createConsumerTable() {

    //CALL USER TABLE IF NOT EXISTS TO ASSOCIATE IN CONSUMERS TABLE
    createUserTable()

    //CREATE CONSUMER TABLE
    consumerTable()

    //CREATE CONSUMER TRIGGER INSERT, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(consumerTriggerInsert,250)

    //CREATE CONSUMER TRIGGER DELETE, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(consumerTriggerDelete,300)
}

createConsumerTable()