let dbConnection = require('./DatabaseController')

/**
 * Async function to get all or some orders and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeOrders = async function (req, res) { 

    let statement = "SELECT * FROM orders";
    
    if(Object.keys(req.query).length !== 0) { 

        console.log(req.query)

        let params = {} 

        for(let i = 0 ; i < Object.keys(req.query).length; i++) {
            let key = Object.keys(req.query)[i];
            let value = Object.values(req.query)[i]

            if(value != "" && (key != "created_at_init" && key != "created_at_final")){ 
                params[key] = value
            }

        }

        statement += " WHERE (order_date BETWEEN '" + req.query.created_at_init + "' AND '" + req.query.created_at_final + "')"

        for(let i = 0 ; i < Object.keys(params).length; i++) { 

            let key = Object.keys(params)[i];
            let value = Object.values(params)[i]
            let nextKey = Object.keys(params)[i+1];

            if(i == 0){
                statement += " AND ";
            }

            if(key != "total_price" && key != "total_products") {

                statement += key;
                statement += `='`;
                statement += value; 
                statement += `'` ;

            }
            else{

                statement += key;
                statement += `<='`;
                statement += value; 
                statement += `'` ;

            }

            if(nextKey != undefined){
                statement += ` AND ` ;
            }
        }
    }

    console.log(statement)

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get all orders");
    } else if (result.length < 1) {
        return res.send("There is no order in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to get order by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getOrderByID = async function (req, res) { 

    const statement = "SELECT * FROM orders WHERE id = " + req.params.id

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get order with id " + req.params.id);
    } else if (result.length < 1) {
        return res.send("Order with id " + req.params.id + " does not exist in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to delete order by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteOrderByID = async function (req, res) {

    const statement = "DELETE FROM orders WHERE id = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the order with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Order with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Order with id " + req.params.id + " has been deleted");
}

/**
 * Async function to insert order and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertOrder = async function (req, res) {

    const data = [req.query.order_number, req.query.order_date, req.query.order_status, req.query.total, req.query.address, req.query.size];

    const statement = "INSERT INTO orders (order_number, order_date, order_status, total, address, size) VALUES ?";

    let result = await dbConnection(statement, [data]);

    if (result === "error") {
        return res.status(500).json("Not possible to insert this order");
    }

    return res.send("Order has been created");
}

/**
 * Async function to update order by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateOrderByID = async function (req, res) { 

    let statement = `UPDATE orders SET `;

    for(let i = 0 ; i < Object.keys(req.query).length; i++) {
        
        let key = Object.keys(req.query)[i];
        let value = Object.values(req.query)[i]
        let nextKey = Object.keys(req.query)[i+1];
        let nextValue = Object.values(req.query)[i+1]
        
        if(value != ""){
            statement += key;
            statement += `='`;
            statement += value; 
            statement += `'` ;
        }

        if(nextKey != undefined && nextValue != ""){
            statement += `, ` ;
        }
    }

    statement += ` WHERE id='${parseInt(req.params.id)}';`;

    let result = await dbConnection(statement);

    if (result === "error") {
        return res.status(500).json("Not possible to update this order");
    } else if (result.affectedRows == 0) {
        return res.send("Order with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Order has been updated");
}

module.exports = {getAllorSomeOrders, getOrderByID, deleteOrderByID, insertOrder, updateOrderByID}