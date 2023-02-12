let pool = require('../../config/dbConfigLocal')

const statement = "DROP TABLE IF EXISTS consumers"; 

const trigger = "DROP TRIGGER IF EXISTS add_consumer_to_userTable;"

const dropTableConsumer = () => {
    pool.query(statement, function(error, result){
        if(error){
            throw error + '\n' + 'Not possible delete table consumers'
        }
        console.log("Table consumers deleted");
    });
}

const dropTriggerConsumer = () => {
    pool.query(trigger, function(error, result){
        if(error){
            throw error + '\n' + 'Not possible delete trigger consumer_to_userTable'
        }
        console.log("Trigger consumer_to_userTable deleted");
        process.exit();
    });
}

function deleteConsumerTable() {
    
    //DELETE CONSUMER TABLE
    dropTableConsumer()

    //DELETE CONSUMER TRIGGER, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(dropTriggerConsumer,500)
    
}

deleteConsumerTable()