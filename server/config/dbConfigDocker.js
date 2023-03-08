const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '..', '.env') });
const mysql = require('mysql2');

//pool config
const pool = mysql.createPool({
    connectionLimit: 100, //important
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

/**
 * Get connection with pool db
 */
pool.getConnection((error) => {

    if (error) { 
        throw error + '\n' + 'Database connected unsuccessfully'
    } 
})

module.exports = pool;