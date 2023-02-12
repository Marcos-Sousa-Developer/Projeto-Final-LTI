let pool = require('../../config/dbConfigLocal')

const statement = "DROP TABLE IF EXISTS suppliers; ";

const trigger = "DROP TRIGGER IF EXISTS add_supplier_to_userTable; " 


const dropTableSupplier = () => {
    pool.query(statement, function(error, result){
        if(error){
            throw error + '\n' + 'Not possible delete table suppliers'
        }
        console.log("Table suppliers deleted");
    });
}

const dropTriggerSupplier = () => {
    pool.query(trigger, function(error, result){
        if(error){
            throw error + '\n' + 'Not possible delete trigger supplier_to_userTable'
        }
        console.log("Trigger supplier_to_userTable deleted");
        process.exit();
    });
}
 

function deleteSupplierTable() {

    //DELETE SUPPLIER TABLE
    dropTableSupplier()
    
    //DELETE SUPPLIER TRIGGER, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
    setTimeout(dropTriggerSupplier,500)
}

deleteSupplierTable()