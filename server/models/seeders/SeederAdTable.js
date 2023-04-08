let pool = require('../../config/dbConfigLocal')

const fake_ads_data = require('../factories/FAKE_ADS_DATA.json')

const statement = "INSERT INTO ads (title, description, extraCharacteristic, status, price, supplier_id, product_id) VALUES ? "

let values = [] 

fake_ads_data.forEach(row => {

    values.push([row.title, row.description, row.extraCharacteristic, row.status, row.price, row.supplier_id, row.product_id])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table ads'
    } 

    console.log("Insert ads completed");

    process.exit();
});