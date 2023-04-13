let pool = require('../../config/dbConfigLocal')

const fake_vehicle_data = require('../factories/FAKE_VEHICLE_DATA.json')

const statement = "INSERT INTO vehicles (license_plate, name, production_unit, status, " +
                "capacity, orders_list, id_production_unit, created_at) VALUES ? "

let values = [] 

fake_vehicle_data.forEach(row => {

    values.push([row.license_plate, row.name, row.production_unit, row.status, 
                row.capacity, row.orders_list, row.id_production_unit,
                row.created_at])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table vehicles'
    } 

    console.log("Insert vehicles completed");

    process.exit();
});