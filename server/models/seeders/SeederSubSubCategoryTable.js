let pool = require('../../config/dbConfigLocal')

const fake_subsubcategory_data = require('../factories/FAKE_SUBSUBCATEGORY_DATA.json')

const statement = "INSERT INTO subsubcategories (name) VALUES ? "

let values = []

fake_subsubcategory_data.forEach(row => {

    values.push([row.name])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table subsubcategories'
    } 

    console.log("Insert subsubcategories completed");

    process.exit();
});