let pool = require('../../config/dbConfigLocal')

const createUserTable = require('./CreateUserTable')

const statement = "CREATE TABLE consumers ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "name varchar(255) NOT NULL, " + 
                  "email varchar(255) NOT NULL, " +
                  "nif varchar(255) NOT NULL, " + //ver o numero de carateres possiveis
                  "mobile_number varchar(255) NOT NULL, " + //ver o numero de carateres possiveis
                  "address varchar(255) NOT NULL, " + 
                  "user_type varchar(255) NOT NULL, " +
                  "account_status BOOLEAN NOT NULL, " + //account_status type bool
                  "shopping_cart varchar(255), " +   //add NOT NULL
                  "orders varchar(255), " +   //add NOT NULL     Coloquei assim, em vez de encomendas recebidase por receber, porque epois podemos ir ver ao status da encomenda
                  "PRIMARY KEY (id))"; 

//AFTER INSERT NEW CONSUMER AUTOMATICALY INSERT ON USER TABLE
const triggers = "CREATE TRIGGER add_consumer_to_userTable " + 
                 "After INSERT ON consumers " + 
                 "FOR EACH ROW " + 
                 "BEGIN " + 
                 "Declare name  varchar(255); " +
                 "Declare email  varchar(255); " +
                 "Declare user_type  varchar(255); " +
                 "Declare id_user_type  int; " +
                 "Set name = NEW.name; " +
                 "Set email = NEW.email; " +
                 "Set user_type = 'consumer'; " +
                 "Set id_user_type = NEW.id; " +
                 "INSERT INTO users (name, email, user_type, id_user_type) VALUES (name, email, user_type, id_user_type); " +
                 "END"                 

//CREATE CONSUMER TABLE
const consumerTable = () => {
    
        pool.query(statement, function(error, result) {

        if(error) {
            throw error + '\n' + 'Not possible create table consumers'
        }

        console.log("Table consumers created"); 

    });
}

//CREATE CONSUMER TO USERS TRIGGER
const consumerTrigger = () => {
    pool.query(triggers, function(error, result) {

        if(error) {
            throw error + '\n' + 'Not possible create triggers for consumer_to_userTable'
        }

        console.log("Triggers for consumer_to_userTable created"); 
        
        process.exit()

    });
}

function createConsumerTable() {

    //CALL USER TABLE IF NOT EXISTS TO ASSOCIATE IN CONSUMERS TABLE
    createUserTable()

    //CREATE CONSUMER TABLE
    consumerTable()

    //CREATE CONSUMER TRIGGER
    consumerTrigger()
}

createConsumerTable()

