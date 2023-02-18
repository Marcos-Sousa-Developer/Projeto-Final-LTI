let exec = require('child_process').exec;

exec('node ./models/migrations/CreateConsumerTable.js',
    function (error, stdout) {

        console.log(stdout);
        
        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/migrations/CreateSupplierTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/migrations/CreateProductTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});