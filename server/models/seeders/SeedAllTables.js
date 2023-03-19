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

exec('node ./models/seeders/SeederSupplierProductTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/seeders/SeederOrderTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/seeders/SeederVehicleTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/seeders/SeederProductionUnitTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});