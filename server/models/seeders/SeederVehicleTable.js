let pool = require('../config/getLocaldbConfig')

const fake_vehicle_data = require('../factories/FAKE_VEHICLE_DATA.json')

const statement = "INSERT INTO vehicles (name) VALUES ? "

let values = [] 

fake_vehicle_data.forEach(row => {

    values.push([row.name])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table vehicles'
    } 

    console.log("Insert vehicles completed");

    process.exit();
});