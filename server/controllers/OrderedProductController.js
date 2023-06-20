let dbConnection = require('./DatabaseController')
const jwt = require('../config/jwtConfig')

/**
 * Async function to get all or some ordered products and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeOrderedProducts = async function (req, res) { 

    let statement = "SELECT * FROM orderedProducts";

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

            if(key == "product_owner_uid"){
                const uid_encrypt = req.cookies.userSession;
                value = jwt.decryptID(uid_encrypt);         
                statement += key;
                statement += `='`;
                statement += value; 
                statement += `'` ;
            }
            else if (key == "product_buyer_uid"){
                const uid_encrypt = req.cookies.userSession;
                value = jwt.decryptID(uid_encrypt);  
                statement += key;
                statement += `='`;
                statement += value; 
                statement += `'` ;
            }
            else if (key == "price"){
                statement += key;
                statement += `<='`;
                statement += value; 
                statement += `'` ;
            }
            else {
                statement += key;
                statement += `='`;
                statement += value; 
                statement += `'` ;
            }

            if(nextKey != undefined){
                statement += ` AND ` ;
            }
            else {
                statement += ` ORDER BY created_at ASC `;
            }
        }
    }

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get all ordered products");
    } else if (result.length < 1) {
        return res.send("There is no ordered product in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to get ordered product by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getOrderedProductByID = async function (req, res) { 

    const statement = "SELECT * FROM orderedProducts WHERE id = " + req.params.id

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get ordered product with id " + req.params.id);
    } else if (result.length < 1) {
        return res.send("Ordered product with id " + req.params.id + " does not exist in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to insert ordered product and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertOrderedProduct = async function (req, res) {

    const data = [req.query.order_id, req.query.ad_id, req.query.product_category, 
                req.query.product_subcategory, req.query.product_subsubcategory, 
                req.query.order_status, req.query.product_owner_uid, 
                req.query.product_buyer_uid, req.query.product_location, req.query.buyer_location, 
                req.query.sameLocation, req.query.price, req.query.vehicle, req.query.quantity];

    const statement = "INSERT INTO orderedProducts (order_id, ad_id, product_category, " +    
                    "product_subcategory, product_subsubcategory, order_status, product_owner_uid, " +
                    "product_buyer_uid, product_location, buyer_location, sameLocation, " +
                    "price, vehicle, quantity) VALUES ?";
 
    let result = await dbConnection(statement, [data]);

    if (result === "error") {
        return res.status(500).json("Not possible to insert this ordered product");
    }

    return res.send("Ordered product has been created");
}

/**
 * Async function to update ordered product by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateOrderedProductByID = async function (req, res) { 

    let statement = `UPDATE orderedProducts SET `;

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
        return res.status(500).json("Not possible to update this ordered product");
    } else if (result.affectedRows == 0) {
        return res.send("Ordered product with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Ordered product has been updated");
}

/**
 * Async function to delete order product by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteOrderProductByID = async function (req, res) {

    const statement = "DELETE FROM orderedProducts WHERE id = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the ordered product with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Ordered product with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Order with id " + req.params.id + " has been deleted");
}



module.exports = {getAllorSomeOrderedProducts, getOrderedProductByID, insertOrderedProduct, updateOrderedProductByID, deleteOrderProductByID}