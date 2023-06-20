const jwtAccess = require('../config/jwtConfig');
let dbConnection = require('./DatabaseController')

/**
 * Async function to get notification
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getNotifications = async function (req, res) { 

    const statement = "SELECT * FROM notifications WHERE user_uid='" + jwtAccess.decryptID(req.cookies.userSession) + "' ORDER BY `id` DESC"
    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500);
    }
    
    return res.send(result)
}

/**
 * Async function to delete notifications
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteNotifications = async function (req, res) {

    const statement = "DELETE FROM notifications WHERE user_uid='" + jwtAccess.decryptID(req.cookies.userSession) + "'"

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500);
    }

    return res.send("Notification with id " + req.params.id + " has been deleted");
}

/**
 * Async function to insert notifications and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertNotifications = async function (req, res) { 


    try {

        if(req.params.id === null || req.params.id === undefined) {

            const data = [req.query.user_uid, req.query.order_id, req.query.order_status, req.query.status];
    
            const statement = "INSERT INTO notifications (user_uid, order_id, order_status, status) VALUES ?";
        
            let result = await dbConnection(statement, [data]);
        
            if (result === "error") {
                return res.status(500);
            }
        
            return res.send("Notification has been created");
    
        } 
    
        else {

            const statement = "SELECT * FROM orderedProducts WHERE id=" + req.params.id;
            let result = await dbConnection(statement);  

            if(req.cookies.userSession === null || req.cookies.userSession === undefined) {
                const statement3 = "INSERT INTO notifications (user_uid, order_id, order_status, status) VALUES ?";
                let data1 = [result[0].product_owner_uid, req.params.id, req.query.order_status, "For read"]; 
                let data2 = [result[0].product_buyer_uid, req.params.id, req.query.order_status, "For read"]; 
                let result3 = await dbConnection(statement3, [data1]);
                let result4 = await dbConnection(statement3, [data2]);

                if (result3 === "error" || result4 === "error") {
                    return res.status(500);
                }
            }

            else {
                let data = [result[0].product_owner_uid, req.params.id, req.query.order_status, "For read"]; 
                if (jwtAccess.decryptID(req.cookies.userSession) == result[0].product_owner_uid) {
                    data = [result[0].product_buyer_uid, req.params.id, req.query.order_status, "For read"];
                }
                const statement2 = "INSERT INTO notifications (user_uid, order_id, order_status, status) VALUES ?";
                let result2 = await dbConnection(statement2, [data]);
                if (result2 === "error") {
                    return res.status(500);
                }
            }
        
            return res.send("Notification has been created");
    
        }

    }
    catch {
        return res.status(500);

    }

    
}

module.exports = {getNotifications, deleteNotifications, insertNotifications}