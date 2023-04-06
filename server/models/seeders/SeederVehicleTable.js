let pool = require('../../config/dbConfigLocal')

const fake_vehicle_data = require('../factories/FAKE_VEHICLE_DATA.json')

const statement = "INSERT INTO vehicles (license_plate, name, status, capacity) VALUES ? "

let values = [] 

fake_vehicle_data.forEach(row => {

    values.push([row.license_plate, row.name, row.status, row.capacity])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table vehicles'
    } 

    console.log("Insert vehicles completed");

    process.exit();
});