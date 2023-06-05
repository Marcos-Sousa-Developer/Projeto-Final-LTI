let dbConnection = require('./DatabaseController')
const jwt = require('../config/jwtConfig')


/**
 * Async fucntion to get all users and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeAdmins = async function (req, res) { 

    let statement = "SELECT * FROM admins";  
    
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

            if(key == "uid"){
                const uid_encrypt = req.cookies.userSession;
                value = jwt.decryptID(uid_encrypt);
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
    
    if (result.includes("error")) {
        return res.status(500).json("Not possible to get all admins");
    } else if (result.length < 1) {
        return res.send("There is no admin in the database");
    }
    
    return res.send(result) 
} 



/**
 * Async function to update consumer by id and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const updateAdminByID = async function (req, res) { 

    let statement = `UPDATE admins SET `;

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
        return res.status(500).json("Not possible to update this admin");
    } else if (result.affectedRows == 0) {
        return res.send("Admin with id " + req.params.id + " does not exist in the database");
    }

    return res.send("Admin has been updated");
}

module.exports = {getAllorSomeAdmins,updateAdminByID}