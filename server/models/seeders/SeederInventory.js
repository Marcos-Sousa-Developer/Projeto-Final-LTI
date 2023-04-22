let pool = require('../../config/dbConfig')
const util = require('util');

const inventory = require('../factories/FAKE_INVENTORY.json')

const statementCategories = "INSERT INTO categories (name) VALUES (?) "
const statementSubCategories = "INSERT INTO subcategories (name,characteristics,id_category) VALUES (?) "
const statementSubSubCategories = "INSERT INTO subsubcategories (name,characteristics,id_subcategory) VALUES (?) "

/**
 * @description util.promisify is a function provided by the Node.js util 
 * module that converts a callback-based asynchronous 
 * function into a Promise-based asynchronous function.
 * 
 * @description is a method that returns a new function with the same behavior as the original function,
 *  but with the this value bound to the pool object. 
 * This means that when the new function is called, it will be executed with pool as its this value.
 */
const query = util.promisify(pool.query).bind(pool);

async function insertData() {
    try {
        for (const categorie of inventory) {
            const resultCategorie = await query(statementCategories, [categorie.name]);
            const subcategories = categorie.subcategories;
            for (const subcategorie of subcategories) {
                const resultSubCategorie = await query(statementSubCategories, [[subcategorie.name, JSON.stringify(categorie.characteristics), resultCategorie.insertId]]);
                const subsubcategories = subcategorie.subsubcategories;
                for (const subsubcategorie of subsubcategories) {
                    await query(statementSubSubCategories, [[subsubcategorie, JSON.stringify(subcategorie.characteristics) ?? "NULL", resultSubCategorie.insertId]]);
                }
            }
        }
        process.exit()
    } catch (error) {
        throw error;
    }
}
insertData()