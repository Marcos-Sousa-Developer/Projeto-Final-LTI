require("dotenv").config();
const express = require('express');
const app = express(); 
const port = process.env.DEVELOPMENT_PORT || 5000;  

const cors = require("cors")

app.use(cors())

app.use('/api/users' , require('./api/ApiUsers'))
app.use('/api/consumers' , require('./api/ApiConsumers'))
app.use('/api/suppliers' , require('./api/ApiSuppliers'))
app.use('/api/products' , require('./api/ApiProducts'))
app.use('/api/categories' , require('./api/ApiCategories'))
app.use('/api/characteristics' , require('./api/ApiCharacteristics'))

// create a GET route
app.get('/api', (req, res) => { //Line 9
    res.send({ express: 'HELLO WORLD, YOU ARE CONNECTED TO THE API, PLEASE THE CHECK ENDPOINTS' });
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 