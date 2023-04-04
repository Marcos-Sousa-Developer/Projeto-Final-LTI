const pool = require('../config/dbConfigDocker')

/**
 * THIS FUNCTION MAKE A REQUEST TO DATABASE
 * This function is the type async because we need to wait for a database response.
 * So whenever we need to fetch db data, our functions that call it, need to be 
 * type async also.
 * @param {*} query //the statement that we need
 * @returns promise
 */
const dbConnection = async (query, array = []) => { 
        
    let promise = new Promise(function(resolve) {

        pool.query(query, [array], function(error, result) { 

            if (error){ 
                resolve("error")
            }
            else { 
                resolve(result)
            }
        });
    })    
    
    return promise
} 

module.exports = dbConnection