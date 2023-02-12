let exec = require('child_process').exec;

exec('node ./models/resets/ResetUserTable.js',
    function (error, stdout) {
        console.log(stdout);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

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

