let pool = require('../../config/dbConfigLocal')

const statement = "DROP TABLE IF EXISTS consumers"; 

const trigger = "DROP TRIGGER IF EXISTS add_consumer_to_userTable;"

const dropTableConsumer = function() {
    pool.query(statement, function(error, result){
        if(error){
            throw error + '\n' + 'Not possible delete table consumers'
        }
        console.log("Table consumers deleted");
    });
}

const dropTriggerConsumer = function() {
    pool.query(trigger, function(error, result){
        if(error){
            throw error + '\n' + 'Not possible delete trigger supplier_to_userTable'
        }
        console.log("Trigger consumer_to_userTable deleted");
        process.exit();
    });
}

function deleteConsumerTable() {
    dropTableConsumer()
    dropTriggerConsumer() 
}

deleteConsumerTable()