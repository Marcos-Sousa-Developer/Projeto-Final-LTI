let pool = require('../config/getLocaldbConfig')

const statement = "DROP TABLE IF EXISTS consumers"; 

const trigger_insert = "DROP TRIGGER IF EXISTS add_consumer_to_userTable;"

const trigger_delete = "DROP TRIGGER IF EXISTS remove_consumer_to_userTable;"

const dropTableConsumer = () => {
    
    pool.query(statement, function(error, result){

        if (error) {
            throw error + '\n' + 'Not possible delete table consumers'
        }

        console.log("Table consumers deleted");
    });
}

const dropInsertTriggerConsumer = () => {

    pool.query(trigger_insert, function(error, result){

        if (error) {
            throw error + '\n' + 'Not possible delete trigger insert consumer_to_userTable'
        }

        console.log("Trigger insert consumer_to_userTable deleted");
    });
}

const dropDeleteTriggerConsumer = () => {

    pool.query(trigger_delete, function(error, result){

        if (error) {
            throw error + '\n' + 'Not possible delete trigger delete consumer_to_userTable'
        }

        console.log("Trigger delete consumer_to_userTable deleted");
        
        process.exit();
    });
}

function deleteConsumerTable() {
    
    //DELETE CONSUMER TABLE
    dropTableConsumer()

    //DELETE CONSUMER TRIGGER INSERT, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(dropInsertTriggerConsumer,250)

    //DELETE CONSUMER TRIGGER DELETE, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(dropDeleteTriggerConsumer,300)
}

deleteConsumerTable()