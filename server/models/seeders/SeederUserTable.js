let pool = require('../../config/dbConfigLocal')

const fake_user_data = require('../factories/FAKE_USER_DATA.json')

const statement = "INSERT INTO users (name, email, user_type) VALUES ? "

let values = []

fake_user_data.forEach(row => {

    values.push([row.name, row.email, row.user_type])     
    
});

pool.query(statement, [values], function(error, result){

    if(error){

        throw error + '\n' + 'Not possible insert data into table users'
    }
    console.log("Insert users completed");
    
    process.exit();
});

