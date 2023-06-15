let pool = require('../config/getLocaldbConfig')

const fake_ads_data = require('../factories/FAKE_ADS_DATA.json')

const statement = "INSERT INTO ads (title, description, email, mobile_number, extraCharacteristic, status, " +
                "price, production_date, supplier_id, product_id, category_name, subcategory_name, subsubcategory_name) VALUES ? "

const category_data = require('../factories/CATEGORY_DATA.json')
const subcategory_data = require('../factories/SUBCATEGORY_DATA.json')
const subsubcategory_data = require('../factories/SUBSUBCATEGORY_DATA.json')

let values = [] 

fake_ads_data.forEach(row => {  

    category = category_data[Math.floor(Math.random() * 11)]
    subcategory = null
    subsubcategory = null

    while(true) {
        sub = subcategory_data[Math.floor(Math.random() * 40)]
        if(sub.id_category === category.id) {
            subcategory = sub
            break
        }
    }

    while(true){
        subsub  = subsubcategory_data[Math.floor(Math.random() * 224)]
        if(subsub.id_subcategory === subcategory.id) {
            subsubcategory = subsub
            break
        }
    }


    values.push([row.title, row.description, row.email ?? "not_null@gmail.com", row.mobile_number ?? "123456789", "{}", row.status, 
                row.price, row.production_date, 1, row.product_id, category.name, subcategory.name, subsubcategory.name])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table ads'
    } 

    console.log("Insert ads completed");

    process.exit();
});