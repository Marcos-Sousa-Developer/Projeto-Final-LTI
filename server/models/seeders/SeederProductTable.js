let pool = require('../../config/dbConfigLocal') 

const fake_product_data = require('../factories/FAKE_PRODUCT_DATA.json')

const statement = "INSERT INTO products (EAN, name, data_producao, descricao) VALUES ? "

let values = []

fake_product_data.forEach(row => {

    values.push([row.EAN, row.name, row.data_producao, row.descricao])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table products'
    } 

    console.log("Insert products completed");

    process.exit();
});