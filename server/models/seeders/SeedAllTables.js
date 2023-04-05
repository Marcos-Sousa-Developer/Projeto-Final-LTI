let exec = require('child_process').exec;

exec('node ./models/seeders/SeederConsumerTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/seeders/SeederSupplierTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/seeders/SeederProductTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/seeders/SeederProductTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/seeders/SeederInventory.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});


//TODO
/* Changed with seed All Category, subCategory and subsubcategory
exec('node ./models/seeders/SeederCategoryTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/seeders/SeederSubCategoryTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/seeders/SeederSubSubCategoryTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});
*/

//TODO
//Fake data not correct
/*
exec('node ./models/seeders/SeederAdTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});
*/


exec('node ./models/seeders/SeederOrderTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

//TODO does not work because some database elements, miss names
/*
exec('node ./models/seeders/SeederVehicleTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});
*/

exec('node ./models/seeders/SeederProductionUnitTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/seeders/SeederOrderedProductTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

//TODO does not work because not have json data
/*
exec('node ./models/seeders/SeedProductProductionUnitTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});
*/