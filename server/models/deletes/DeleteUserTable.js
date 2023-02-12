let pool = require("../../config/dbConfigLocal");

const statement = "DROP TABLE IF EXISTS users";

pool.query(statement, function (error, result) {
  if (error) {
    throw error + "\n" + "Not possible delete table users";
  }
  console.log("Table users deleted");
  process.exit();
});
