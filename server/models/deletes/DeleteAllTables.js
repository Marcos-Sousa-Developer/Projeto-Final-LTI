let exec = require('child_process').exec;

exec('node ./models/deletes/DeleteUserTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/deletes/DeleteConsumerTable.js',
    function (error, stdout) {

        console.log(stdout);

        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/deletes/DeleteSupplierTable.js',
    function (error, stdout) {

        console.log(stdout);
        
        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ./models/deletes/DeleteProductTable.js',
    function (error, stdout) {

        console.log(stdout);
        
        if (error !== null) {
             console.log('exec error: ' + error);
        }
});