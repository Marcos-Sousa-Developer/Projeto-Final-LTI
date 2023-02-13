let pool = require('../../config/dbConfigLocal') 
let userTable = require('../migrations/CreateUserTable')

const fake_consumer_data = require('../factories/FAKE_CONSUMER_DATA.json')

const statement = "INSERT INTO consumers (name, email, nif, mobile_number, address, user_type, account_status) VALUES ? "

let values = [] 

fake_consumer_data.forEach(row => {

    values.push([row.name, row.email, row.nif, row.mobile_number, row.address, row.user_type, row.account_status])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table consumers'
    } 

    console.log("Insert consumers completed");

    process.exit();
});