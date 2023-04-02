let pool = require('../../config/dbConfigLocal')

const fake_subcategory_data = require('../factories/FAKE_SUBCATEGORY_DATA.json')

const statement = "INSERT INTO subcategories (name) VALUES ? "

let values = []

fake_subcategory_data.forEach(row => {

    values.push([row.name])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table subcategories'
    } 

    console.log("Insert subcategories completed");

    process.exit();
});