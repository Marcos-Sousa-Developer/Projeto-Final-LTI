let pool = require('../../config/dbConfigLocal')

const fake_productionunit_data = require('../factories/FAKE_PRODUCTIONUNIT_DATA.json')

const statement = "INSERT INTO productionUnits (stock, location, capacity) VALUES ? "

let values = [] 

fake_productionunit_data.forEach(row => {

    values.push([row.stock, row.location, row.capacity])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table productionUnits'
    } 

    console.log("Insert productionUnits completed");

    process.exit();
});