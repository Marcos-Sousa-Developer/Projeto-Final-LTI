let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE products ( " +
                  "EAN int NOT NULL, " + 
                  "name varchar(255) NOT NULL, " + 
                  "data_producao varchar(255) NOT NULL, " + //passar para Date
                  "descricao varchar(255) NOT NULL, " + //verificar o numero de carateres possiveis
                  "PRIMARY KEY (EAN))"; 

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table products'
    }

    console.log("Table products created"); 

    process.exit()
});