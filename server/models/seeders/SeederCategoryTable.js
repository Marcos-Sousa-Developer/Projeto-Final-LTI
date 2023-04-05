let pool = require('../../config/dbConfigLocal')

const category_data = require('../factories/CATEGORY_DATA.json')

const statement = "INSERT INTO categories (id, name) VALUES ? "

let values = []

category_data.forEach(row => {
    values.push([row.id, row.name])
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table categories'
    } 

    console.log("Insert categories completed");

    process.exit();
});