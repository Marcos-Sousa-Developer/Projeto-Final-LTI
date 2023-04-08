let pool = require('../../config/dbConfigLocal')

const fake_product_data = require('../factories/FAKE_PRODUCT_DATA.json')

const statement = "INSERT INTO products (EAN, name, description, category_name, subcategory_name, subsubcategory_name) VALUES ? "

let values = []

fake_product_data.forEach(row => {

    values.push([row.EAN, row.name, row.description, row.category_name, row.subcategory_name, row.subsubcategory_name])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table products'
    } 

    console.log("Insert products completed");

    process.exit();
});