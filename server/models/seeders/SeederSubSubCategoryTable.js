let pool = require('../../config/dbConfigLocal')

const subsubcategory_data = require('../factories/SUBSUBCATEGORY_DATA.json')

const statement = "INSERT INTO subsubcategories (id, name, characteristics, id_subcategory) VALUES ? "

let values = []

subsubcategory_data.forEach(row => {

    values.push([row.id, row.name, row.characteristics, row.id_subcategory])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table subsubcategories'
    } 

    console.log("Insert subsubcategories completed");

    process.exit();
});