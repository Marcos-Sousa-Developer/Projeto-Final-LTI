let pool = require('../config/getLocaldbConfig')

const fake_consumer_data = require('../factories/FAKE_CONSUMER_DATA.json')

const statement = "INSERT INTO consumers (uid, verify, name, email, nif, mobile_number, continent, country, district, " +
                                         "city, town, address, postal_code, status, shopping_cart, total_orders) VALUES ? "

let values = [] 

fake_consumer_data.forEach(row => {

    values.push([row.uid, "U2FsdGVkX1+kYEa98xyqA3WrfTGx00QjRvc/pZtIGyY=", row.name, row.email, row.nif, 
                row.mobile_number, row.continent,
                row.country, row.district,
                row.city, row.town, row.address,
                row.postal_code, 1, row.shopping_cart, 
                row.total_orders])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table consumers'
    } 

    console.log("Insert consumers completed");

    process.exit();
});