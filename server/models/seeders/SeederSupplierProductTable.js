let pool = require('../../config/dbConfigLocal')

const fake_supplierproduct_data = require('../factories/FAKE_SUPPLIERPRODUCT_DATA.json')

const statement = "INSERT INTO supplierProducts (price, fee) VALUES ? "

let values = [] 

fake_supplierproduct_data.forEach(row => {

    values.push([row.price, row.fee])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table supplier products'
    } 

    console.log("Insert supplier product completed");

    process.exit();
});