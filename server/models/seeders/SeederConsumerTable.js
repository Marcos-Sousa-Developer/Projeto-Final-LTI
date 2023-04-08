let pool = require('../../config/dbConfigLocal')

const fake_consumer_data = require('../factories/FAKE_CONSUMER_DATA.json')

const statement = "INSERT INTO consumers (uid, name, email, nif, mobile_number, continent, country, district, " +
                                         "city, town, address, postal_code, status, shopping_cart, total_orders, created_at) VALUES ? "

let values = [] 

fake_consumer_data.forEach(row => {

    values.push([row.uid, row.name, row.email, row.nif, 
                row.mobile_number, row.continent,
                row.country, row.district,
                row.city, row.town, row.address,
                row.postal_code, row.status, row.shopping_cart, 
                row.total_orders, row.created_at])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table consumers'
    } 

    console.log("Insert consumers completed");

    process.exit();
});