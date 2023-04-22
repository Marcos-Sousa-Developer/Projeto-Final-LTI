let pool = require('../config/getLocaldbConfig')

const fake_orderedProduct_data = require('../factories/FAKE_ORDERED_PRODUCT_DATA.json')

const statement = "INSERT INTO orderedProducts (order_id, product_EAN, product_category, product_subcategory, " +
                                            "product_subsubcategory, product_owner_id, product_buyer_id, product_location, " +
                                            "buyer_location, orderDistance_km, sameLocation, price, created_at) VALUES ? "

let values = []

fake_orderedProduct_data.forEach(row => {

    values.push([row.order_id, row.product_EAN, row.product_category, row.product_subcategory,
                row.product_subsubcategory, row.product_owner_id, row.product_buyer_id, row.product_location, 
                row.buyer_location, row.orderDistance_km, row.sameLocation, row.price, row.created_at])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table orderedProducts'
    } 

    console.log("Insert orderedProducts completed");

    process.exit();
});