let exec = require('child_process').exec;

exec('node ResetUserTable.js',
    function (error, stdout) {
        console.log(stdout);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ResetConsumerTable.js',
    function (error, stdout) {
        console.log(stdout);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node ResetSupplierTable.js',
    function (error, stdout) {
        console.log(stdout);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

