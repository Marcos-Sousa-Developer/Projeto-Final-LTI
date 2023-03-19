require("dotenv").config();
const authenticateUser = require('./auth')
const express = require('express');
const app = express(); 
const cookieParser = require('cookie-parser');
const port = process.env.DEVELOPMENT_PORT || 5000;  

const cors = require("cors")

app.use(cors())
app.use(cookieParser());

app.use('/api/users' , require('./api/ApiUsers'))
app.use('/api/consumers' , require('./api/ApiConsumers'))
app.use('/api/suppliers' , require('./api/ApiSuppliers'))
app.use('/api/products' , require('./api/ApiProducts'))
app.use('/api/categories' , require('./api/ApiCategories'))
app.use('/api/subcategories' , require('./api/ApiSubcategories'))
app.use('/api/orders' , require('./api/ApiOrders'))
app.use('/api/vehicles' , require('./api/ApiVehicles'))
app.use('/api/productionUnits' , require('./api/ApiProductionUnits'))

/**
 * Api configuration, only for server
 */
const apiRouter = express.Router();

//midleware for secure all api connections
//apiRouter.use(authenticateUser)

apiRouter.use('/users' , require('./api/ApiUsers'))
apiRouter.use('/consumers' , require('./api/ApiConsumers'))
apiRouter.use('/suppliers' , require('./api/ApiSuppliers'))
apiRouter.use('/products' , require('./api/ApiProducts'))
apiRouter.use('/categories' , require('./api/ApiCategories'))
apiRouter.use('/subcategories' , require('./api/ApiSubcategories'))
apiRouter.get('/', (req, res) => {
    res.send({ express: 'HELLO WORLD, YOU ARE CONNECTED TO THE API, PLEASE THE CHECK ENDPOINTS' });
}); 

/**
* client configuration, only for client connections
*/
const clientRouter = express.Router(); 

clientRouter.use('/',require('./routes/RouteAuthenticateUser'))

//connect app with routers 
app.use('/api',apiRouter)
app.use('/',clientRouter)

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); 