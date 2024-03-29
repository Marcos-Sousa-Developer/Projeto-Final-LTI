let pool = require('../config/getLocaldbConfig')

const fake_productProductionUnit_data = require('../factories/FAKE_PRODUCTPRODUCTIONUNIT_DATA.json')

const statement = "INSERT INTO productProductionUnits (quantity, fee, productionUnit_id, ad_id, title, price) VALUES ? "

let values = []

fake_productProductionUnit_data.forEach(row => {

    values.push([row.quantity, row.fee, row.productionUnit_id, row.ad_id, "teste titulo", 100])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table productProductionUnits'
    }

    console.log("Insert productProductionUnits completed");
    
    process.exit();
});