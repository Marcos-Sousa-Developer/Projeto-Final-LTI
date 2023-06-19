let pool = require('../config/getLocaldbConfig')

const fake_supplier_data = require('../factories/FAKE_SUPPLIER_DATA.json')

const statement = "INSERT INTO suppliers (uid, verify, name, email, nif, mobile_number, " +
                "continent, country, district, city, town, address, postal_code, " +
                "status, products_list, orders) VALUES ? "

let values = []

fake_supplier_data.forEach(row => {

    values.push([row.uid, "U2FsdGVkX19ggelgp/oxtsQ3Mdb+4r/CaGxKDbebxPM=", row.name, row.email, row.nif, 
                row.mobile_number, row.continent,
                row.country,row.district,
                row.city, row.town, row.address,
                row.postal_code, row.status, 
                row.products_list, row.orders])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table suppliers'
    }

    console.log("Insert suppliers completed");
    
    process.exit();
});