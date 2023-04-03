let pool = require('../../config/dbConfigLocal') 

const fake_category_data = require('../factories/FAKE_ORDERED_PRODUCT_DATA.json')

const statement = "INSERT INTO orderedProduct (order_id, product_EAN, product_owner, product_buyer, product_location, " +
                                            "buyer_location, orderDistance_km, price) VALUES ? "

let values = []

fake_category_data.forEach(row => {

    values.push([row.order_id, row.product_EAN, row.product_owner, 
                row.product_buyer, row.product_location, row.buyer_location, 
                row.orderDistance_km, row.price])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table orderedProduct'
    } 

    console.log("Insert orderedProduct completed");

    process.exit();
});