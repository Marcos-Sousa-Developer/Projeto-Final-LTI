let pool = require('../config/getLocaldbConfig')

const statement = "CREATE TABLE notifications ( " +
                  "id int NOT NULL AUTO_INCREMENT, " +            
                  "user_uid varchar(500) NOT NULL, " +
                  "order_id bigint NOT NULL, " +
                  "order_status varchar(255) NOT NULL, " +
                  "status varchar(255) NOT NULL, " +
                  "PRIMARY KEY (id))";

pool.query(statement, function(error, result) {

    if (error) {
        throw error + '\n' + 'Not possible create table notifications'
    }

    console.log("Table notifications created"); 

    process.exit()
});