let pool = require("../../config/dbConfigLocal");

const statement = "DROP TABLE IF EXISTS consumers, suppliers, users; "

pool.query(statement, function (error, result) {
    if (error) {
        throw error + "\n" + "Not possible delete all tables";
    }
    console.log("All tables deleted"); 
    process.exit()
});
