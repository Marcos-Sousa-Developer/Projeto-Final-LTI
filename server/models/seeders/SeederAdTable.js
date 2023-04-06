let pool = require('../../config/dbConfigLocal')

const fake_ads_data = require('../factories/FAKE_ADS_DATA.json')

const statement = "INSERT INTO ads (title, category_name, subcategory_name, subsubcategory_name, " + 
                                    "description, price, supplier_uid) VALUES ? "

let values = [] 

fake_ads_data.forEach(row => {

    values.push([row.title, row.category_name, row.subcategory_name, 
                row.subsubcategory_name, row.description, row.price,
                row.supplier_uid])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table ads'
    } 

    console.log("Insert ads completed");

    process.exit();
});