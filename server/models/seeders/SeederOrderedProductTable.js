let pool = require('../config/getLocaldbConfig')

const fake_orderedProduct_data = require('../factories/FAKE_ORDERED_PRODUCT_DATA.json')

const statement = "INSERT INTO orderedProducts (order_id, ad_id, product_category, product_subcategory, " +
                                            "product_subsubcategory, order_status,product_owner_uid, " +
                                            "product_buyer_uid, product_location, " +
                                            "buyer_location, orderDistance_km, sameLocation, price) VALUES ? "

let values = []

fake_orderedProduct_data.forEach(row => {

    values.push([row.order_id, row.ad_id, row.product_category, row.product_subcategory,
                row.product_subsubcategory, row.order_status, row.product_owner_uid, 
                row.product_buyer_uid, row.product_location, row.buyer_location, 
                row.orderDistance_km, row.sameLocation, row.price])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table orderedProducts'
    } 

    console.log("Insert orderedProducts completed");

    process.exit();
});