let pool = require('../../config/dbConfigLocal')

const fake_supplier_data = require('../factories/FAKE_SUPPLIER_DATA.json')

<<<<<<< HEAD
const statement = "INSERT INTO suppliers (uid, name, email, nif, mobile_number, address) VALUES ? "
=======
const statement = "INSERT INTO suppliers (uid, name, email, nif, mobile_number, continent, country, district, " +
                    "city, town, address, postal_code, status) VALUES ? "
>>>>>>> 3ff524a0c7001fc6489822fdce7e50c9c8c97484

let values = []

fake_supplier_data.forEach(row => {

<<<<<<< HEAD
    values.push([row.uid, row.name, row.email, row.nif, row.mobile_number, row.address])     
=======
    values.push([row.uid, row.name, row.email, row.nif, 
                row.mobile_number, row.continent,
                row.country,row.district,
                row.city, row.town, row.address,
                row.postal_code, row.status])     
>>>>>>> 3ff524a0c7001fc6489822fdce7e50c9c8c97484
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table suppliers'
    }

    console.log("Insert suppliers completed");
    
    process.exit();
});