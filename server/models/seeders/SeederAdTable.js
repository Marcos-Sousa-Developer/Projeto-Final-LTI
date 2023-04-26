let pool = require('../config/getLocaldbConfig')

const fake_ads_data = require('../factories/FAKE_ADS_DATA.json')

const statement = "INSERT INTO ads (title, description, email, mobile_number, extraCharacteristic, status, " +
                "price, production_date, supplier_id, product_id, created_at) VALUES ? "

let values = [] 

fake_ads_data.forEach(row => {

    values.push([row.title, row.description, row.email ?? "not_null@gmail.com", row.mobile_number ?? "123456789",row.extraCharacteristic ?? "{}", row.status, 
                row.price, row.supplier_id, row.product_id, row.created_at])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table ads'
    } 

    console.log("Insert ads completed");

    process.exit();
});