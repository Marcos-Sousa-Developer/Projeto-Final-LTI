let pool = require('../../config/dbConfigLocal')

const fake_category_data = require('../factories/FAKE_CATEGORY_DATA.json')

const statement = "INSERT INTO categories (name) VALUES ? "

let values = []

fake_category_data.forEach(row => {

<<<<<<< HEAD
    values.push([row.name])     
=======
    values.push([row.id, row.name])     
>>>>>>> master
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table categories'
    } 

    console.log("Insert categories completed");

    process.exit();
});