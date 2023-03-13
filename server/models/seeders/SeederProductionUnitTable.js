let pool = require('../../config/dbConfigLocal') 

const fake_consumer_data = require('../factories/FAKE_CONSUMER_DATA.json')

const statement = "INSERT INTO productionUnits (name, email, nif, mobile_number, address, account_status) VALUES ? "

let values = [] 

fake_consumer_data.forEach(row => {

    values.push([row.name, row.email, row.nif, row.mobile_number, row.address, row.account_status])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table production units'
    } 

    console.log("Insert production unit completed");

    process.exit();
});