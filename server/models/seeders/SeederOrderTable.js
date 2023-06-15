let pool = require('../config/getLocaldbConfig')

const fake_order_data = require('../factories/FAKE_ORDER_DATA.json')

const statement = "INSERT INTO orders (order_number, order_date, " +
                "products_list, total, address, size, " +
                "uid_consumer) VALUES ? "

let values = [] 

fake_order_data.forEach(row => {

    values.push([row.order_number, row.order_date, row.products_list, 
                row.total, row.address, row.size, row.uid_consumer])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table orders'
    } 

    console.log("Insert order completed");

    process.exit();
});