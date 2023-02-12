let exec = require('child_process').exec;

exec('node CreateConsumerTable.js',
    function (error, stdout) {
        console.log(stdout);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
});

exec('node CreateSupplierTable.js',
    function (error, stdout) {
        console.log(stdout);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
});