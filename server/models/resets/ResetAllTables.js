let exec = require('child_process').exec;

exec('node ./models/resets/ResetConsumerTable.js',
    function (error, stdout) {

        console.log(stdout);
        
        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/resets/ResetSupplierTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error); 
        }
});

exec('node ./models/resets/ResetProductTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error); 
        }
});

exec('node ./models/resets/ResetCategoryTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error); 
        }
});

exec('node ./models/resets/ResetSubCategoryTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error); 
        }
});

exec('node ./models/resets/ResetSubSubCategoryTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error); 
        }
});

exec('node ./models/resets/ResetSupplierProductTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/resets/ResetOrderTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/resets/ResetVehicleTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/resets/ResetProductionUnitTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/resets/ResetOrderedProduct.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});