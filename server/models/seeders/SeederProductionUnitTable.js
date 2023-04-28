let pool = require('../config/getLocaldbConfig')

const fake_productionunit_data = require('../factories/FAKE_PRODUCTIONUNIT_DATA.json')

const statement = "INSERT INTO productionUnits (name, location, capacity, " +
                "uid_supplier) VALUES ? "

let values = [] 

fake_productionunit_data.forEach(row => {

    values.push([row.name, row.location, row.capacity, row.uid_supplier])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table productionUnits'
    } 

    console.log("Insert productionUnits completed");

    process.exit();
});