let pool = require("../../config/dbConfigLocal");

const statement = "DROP TABLE IF EXISTS admins";

pool.query(statement, function (error, result) {
  if (error) {
    throw error + "\n" + "Not possible delete table admins";
  }

  console.log("Table admins deleted");
  
  process.exit();
});