let pool = require('../../config/dbConfigLocal')

const fake_product_data = require('../factories/FAKE_PRODUCT_DATA.json')

const statement = "INSERT INTO products (EAN, production_date, characteristics, id_subsubcategory, " +
                "id_production_unit, status, created_at) VALUES ? "

let values = []

fake_product_data.forEach(row => {

    values.push([row.EAN, row.production_date, row.characteristics, row.id_subsubcategory, 
                row.id_production_unit, row.status, row.created_at])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table products'
    } 

    console.log("Insert products completed");

    process.exit();
});