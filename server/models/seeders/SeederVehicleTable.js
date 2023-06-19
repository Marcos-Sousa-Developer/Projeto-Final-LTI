let pool = require('../config/getLocaldbConfig')

const fake_vehicle_data = require('../factories/FAKE_VEHICLE_DATA.json')

const statement = "INSERT INTO vehicles (name, credentialAccess, accessCode) VALUES ? "
const { v4: uuidv4 } = require('uuid');

let values = [] 

fake_vehicle_data.forEach(row => { 

    values.push([row.name, uuidv4(), uuidv4().substring(0, 6)])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table vehicles'
    } 

    console.log("Insert vehicles completed");

    process.exit();
});