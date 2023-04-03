let pool = require('../../config/dbConfigLocal')

const fake_order_data = require('../factories/FAKE_ORDER_DATA.json')

const statement = "INSERT INTO orders (order_number, order_date, order_status, products_list, total, address, size) VALUES ? "

let values = [] 

fake_order_data.forEach(row => {

    values.push([row.order_number, row.order_date, row.order_status, row.products_list, row.total, row.address, row.size])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table orders'
    } 

    console.log("Insert order completed");

    process.exit();
});