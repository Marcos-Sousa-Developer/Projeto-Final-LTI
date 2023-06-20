let pool = require('../config/getLocaldbConfig')

const admin_data = require('../factories/ALL_ADMIS_DATA.json')

const statement = "INSERT INTO admins (uid, verify, name, email, mobile_number, address, continent, country, district, " +
                                         "city, town, postal_code, status) VALUES ? "

let values = [] 

admin_data.forEach(row => {

    values.push([row.uid, "U2FsdGVkX1+kYEa98xyqA3WrfTGx00QjRvc/pZtIGyY=", row.name, row.email, 
                row.mobile_number, row.address, row.continent,
                row.country, row.district,
                row.city, row.town, 
                row.postal_code, 1])     
});

pool.query(statement, [values], function(error, result){

    if (error) {
        throw error + '\n' + 'Not possible insert data into table admins'
    } 

    console.log("Insert admins completed");

    process.exit();
});