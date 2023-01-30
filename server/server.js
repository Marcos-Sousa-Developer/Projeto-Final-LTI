const express = require('express');
const app = express(); 
const port = process.env.PORT || 5000;  

const cors = require("cors")

app.use(cors())


// create a GET route
app.get('/api', (req, res) => { //Line 9
    res.send({ express: 'HELLO WORLD, YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});



// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 