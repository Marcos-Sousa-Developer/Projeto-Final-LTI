let pool = require('../config/getLocaldbConfig')

const category_data = require('../factories/CATEGORY_DATA.json')

const statement = "INSERT INTO categories (name) VALUES ? "

let values = []

category_data.forEach(row => {
    values.push([row.name])
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table categories'
    } 

    console.log("Insert categories completed");

    process.exit();
});