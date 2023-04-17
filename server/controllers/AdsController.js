let dbConnection = require('./DatabaseController')

/**
 * Async function to get all or some ads and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeAds = async function (req, res) { 

    let statement = "SELECT * FROM ads";

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

        for(let i = 0 ; i < Object.keys(params).length; i++) { 

            let key = Object.keys(params)[i];
            let value = Object.values(params)[i]
            let nextKey = Object.keys(params)[i+1];

            if(key == "price") {

                statement += key;
                statement += `<='`;
                statement += value; 
                statement += `'` ;
 
            } else if(key == "title") {

                statement += key;
                statement += ` LIKE '%`;
                statement += value; 
                statement += `%'` ;

            }
            else{

                statement += key;
                statement += `='`;
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
        return res.status(500).json("Not possible to get all ads");
    } else if (result.length < 1) {
        return res.send("There is no ad in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to get ad by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAdByID = async function (req, res) { 

    const statement = "SELECT * FROM ads WHERE id = " + req.params.id

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get ad with id " + req.params.id);
    } else if (result.length < 1) {
        return res.send("Ad with id " + req.params.id + " does not exist in the database");
    }
    
    return res.send(result)
}

/**
 * Async function to delete ad by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const deleteAdByID = async function (req, res) {

    const statement = "DELETE FROM ads WHERE id = " + req.params.id

    let result = await dbConnection(statement)

    if (result === "error") {
        return res.status(500).json("Not possible to delete the ad with id " + req.params.id);
    } else if (result.affectedRows == 0) {
        return res.send("Ad with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Ad with id " + req.params.id + " has been deleted");
}

/**
 * Async function to insert ad and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const insertAd = async function (req, res) {

    const data = [req.query.title, req.query.description, req.query.email, 
                req.query.mobile_number, req.query.extraCharacteristics, req.query.status,
                req.query.price, req.query.supplier_id, req.query.product_id, 
                req.query.created_at];

    const statement = "INSERT INTO ads (title, description, email, mobile_number, " +
                    "extraCharacteristics, status, price, supplier_id, product_id, " +
                    "created_at) VALUES ?";

    let result = await dbConnection(statement, [data]);

    if (result === "error") {
        return res.status(500).json("Not possible to insert this ad");
    }

    return res.send(result);
}

/**
 * Async function to update ad by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateAdByID = async function (req, res) { 

    let statement = `UPDATE ads SET `;

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
        return res.status(500).json("Not possible to update this ad");
    } else if (result.affectedRows == 0) {
        return res.send("Ad with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Ad has been updated");
}

module.exports = {getAllorSomeAds, getAdByID, deleteAdByID, insertAd, updateAdByID}