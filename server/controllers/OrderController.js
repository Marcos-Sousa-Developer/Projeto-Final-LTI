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
        statement += " WHERE "

        let params = {} 

        for(let i = 0 ; i < Object.keys(req.query).length; i++) {
            let key = Object.keys(req.query)[i];
            let value = Object.values(req.query)[i]

            if(value != "" && (key != "created_at_init" && key != "created_at_final")){ 
                params[key] = value
            }

        }

        if (req.query.created_at_init != undefined && req.query.created_at_final != undefined){
            statement += "(created_at BETWEEN '" + req.query.created_at_init + "' AND '" + req.query.created_at_final + "')"
            if(Object.keys(params).length > 0){
                statement += " AND ";
            }
        }

        for(let i = 0 ; i < Object.keys(params).length; i++) { 

            let key = Object.keys(params)[i];
            let value = Object.values(params)[i]
            let nextKey = Object.keys(params)[i+1];

            if(i == 0){
                statement += " AND ";
            }

            statement += key;
            statement += `='`;
            statement += value; 
            statement += `'` ;

            if(nextKey != undefined){
                statement += ` AND ` ;
            }
        }
    }

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

    const data = [req.query.order_number, req.query.order_date, req.query.order_status, 
                req.query.products_list, req.query.total, req.query.address, req.query.size, 
                req.query.id_supplier_product, req.query.id_consumer, req.query.id_vehicle,
                req.query.created_at];

    const statement = "INSERT INTO orders (order_number, order_date, order_status, " +
                    "products_list, total, address, size, id_supplier_product, " +
                    "id_consumer, id_vehicle, created_at) VALUES ?";

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