let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE consumers ( " +
            "id int NOT NULL AUTO_INCREMENT, " + 
            "name varchar(255) NOT NULL, " + 
            "email varchar(255) NOT NULL, " +
            "nif varchar(255) NOT NULL, " + //ver o numero de carateres possiveis
            "mobile_number varchar(255) NOT NULL, " + //ver o numero de carateres possiveis
            "address varchar(255) NOT NULL, " + 
            "user_type varchar(255) NOT NULL, " +
            "account_status varchar(255) NOT NULL, " +
            "shopping_cart varchar(255), " +   //add NOT NULL
            "orders varchar(255), " +   //add NOT NULL     Coloquei assim, em vez de encomendas recebidase por receber, porque epois podemos ir ver ao status da encomenda
            "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if(error) {
        throw error + '\n' + 'Not possible create table consumers'
    }

    console.log("Table consumers created"); 
    
    process.exit()

});