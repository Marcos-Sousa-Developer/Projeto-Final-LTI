let dbConnection = require('./DatabaseController')

const getSubSubCategoryByID = async function (req, res) { 

    const statement = "SELECT * FROM subsubcategories WHERE id = " + req.params.id

    let result = await dbConnection(statement)  

    if (result === "error") {
        return res.status(500).json("Not possible to get subcategory with id " + req.params.id);
    } else if (result.length < 1) {
        return res.send("Subcategory with id " + req.params.id + " does not exist in the database");
    }
    
    return res.send(result)
}

module.exports = {getSubSubCategoryByID}