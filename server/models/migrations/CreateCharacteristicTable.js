let pool = require('../../config/dbConfigLocal')

const statement = "CREATE TABLE characteristics ( " +
                  "id int NOT NULL AUTO_INCREMENT, " + 
                  "name varchar(255) NOT NULL, " + 
                  "id_category int, " +  //não está no fake data porque se faz update posteriormente
                  "PRIMARY KEY (id), " +
                  "FOREIGN KEY (id_category) REFERENCES categories(id) ON DELETE CASCADE)"; 

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table characteristics'
    }

    console.log("Table characteristics created"); 

    process.exit()
});