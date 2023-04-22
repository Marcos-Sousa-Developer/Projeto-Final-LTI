let pool = require("../config/getLocaldbConfig");

const statement = "DROP TABLE IF EXISTS admins";

const trigger_insert = "DROP TRIGGER IF EXISTS add_admin_to_userTable;"

const trigger_delete = "DROP TRIGGER IF EXISTS remove_admin_to_userTable;"

const dropTableAdmin = () => {
    
  pool.query(statement, function (error, result) {
    if (error) {
      throw error + "\n" + "Not possible delete table admins";
    }
  
    console.log("Table admins deleted");
    
  });
}

const dropInsertTriggerAdmin = () => {

  pool.query(trigger_insert, function(error, result){

      if (error) {
          throw error + '\n' + 'Not possible delete trigger insert admin_to_userTable'
      }

      console.log("Trigger insert admin_to_userTable deleted");
  });
}

const dropDeleteTriggerAdmin = () => {

  pool.query(trigger_delete, function(error, result){

      if (error) {
          throw error + '\n' + 'Not possible delete trigger delete admin_to_userTable'
      }

      console.log("Trigger delete admin_to_userTable deleted");
      
      process.exit();
  });
}

function deleteAdminTable() {
    
  //DELETE ADMIN TABLE
  dropTableAdmin()

  //DELETE ADMIN TRIGGER INSERT, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
  setTimeout(dropInsertTriggerAdmin,250)

  //DELETE ADMIN TRIGGER DELETE, WEE NEED TIMEOUT BECAUSE THE ASYNC FUNCTIONS
  setTimeout(dropDeleteTriggerAdmin,300)
}

deleteAdminTable()