let pool = require('../../config/dbConfig')

const subcategory_data = require('../factories/SUBCATEGORY_DATA.json')

const statementInsert = "INSERT INTO subcategories (name, characteristics, "
                        "id_category) VALUES ? "

let values = []

subcategory_data.forEach(row => {

    values.push([row.name, row.characteristics, row.id_category])     
});



/*
const statementSelect = ""

let names = []

subcategory_data.forEach(row => {

    names.push([row.name_category])    
});

console.log(names)*/

pool.query(statementInsert, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table subcategories'
    } 

    console.log("Insert subcategories completed");

    process.exit();
});