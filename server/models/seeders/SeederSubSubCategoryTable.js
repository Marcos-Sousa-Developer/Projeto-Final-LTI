let pool = require('../../config/dbConfigLocal') 

const fake_characterictic_data = require('../factories/FAKE_CHARACTERISTIC_DATA.json')

const statement = "INSERT INTO subsubcategories (id, name, id_subcategory) VALUES ? "

let values = []

fake_characterictic_data.forEach(row => {

    values.push([row.id, row.name, row.id_category])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table subsubcategories'
    } 

    console.log("Insert subsubcategories completed");

    process.exit();
});