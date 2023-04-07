let dbConnection = require('./DatabaseController')

/**
 * Async function to get all or some consumers and await from database response
 * @param {*} req //request from client
 * @param {*} res //response from server
 * @returns result data
 */
const getAllorSomeAds = async function (req, res) { 

    let statement = "SELECT * FROM ads";

    console.log(req.query)

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
        return res.send("There is no ads in the database");
    }
    
    return res.send(result)
}

module.exports = {getAllorSomeAds}