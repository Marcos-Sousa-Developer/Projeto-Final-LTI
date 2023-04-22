const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, '../../', '.env') });
const mysql = require('mysql2'); 

const pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'localhost',
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3307,
});

/**
 * Get connection with pool db
 */
pool.getConnection((error) => {
    if (error) { 
        throw error + '\n' + 'Database connected unsuccessfully'
    } 
    console.log('Database connected successfully')
})

module.exports = pool;