let pool = require('../../config/dbConfigLocal')

const statement = "DROP TABLE IF EXISTS suppliers; ";

const trigger_insert = "DROP TRIGGER IF EXISTS add_supplier_to_userTable; " 

const trigger_delete = "DROP TRIGGER IF EXISTS remove_supplier_to_userTable; " 


const dropTableSupplier = () => {
    pool.query(statement, function(error, result){
        if(error){
            throw error + '\n' + 'Not possible delete table suppliers'
        }
        console.log("Table suppliers deleted");
    });
}

const dropInsertTriggerSupplier = () => {
    pool.query(trigger_insert, function(error, result){
        if(error){
            throw error + '\n' + 'Not possible delete trigger insert supplier_to_userTable'
        }
        console.log("Trigger insert supplier_to_userTable deleted");
    });
}

const dropDeleteTriggerSupplier = () => {
    pool.query(trigger_delete, function(error, result){
        if(error){
            throw error + '\n' + 'Not possible delete trigger delete supplier_to_userTable'
        }
        console.log("Trigger delete supplier_to_userTable deleted");
        process.exit();
    });
}
 

function deleteSupplierTable() {

    //DELETE SUPPLIER TABLE
    dropTableSupplier()
    
    //DELETE SUPPLIER INSERT TRIGGER, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(dropInsertTriggerSupplier,250)

    //DELETE SUPPLIER DELETE TRIGGER, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(dropDeleteTriggerSupplier,300)
}

deleteSupplierTable()