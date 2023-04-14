require("dotenv").config();
const authenticateUser = require('./auth')
const express = require('express');
const app = express(); 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.DEVELOPMENT_PORT || 5000;  

const cors = require("cors")

app.use(cors())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Api configuration, only for server
 */
const apiRouter = express.Router();

//midleware for secure all api connections
//apiRouter.use(authenticateUser)

apiRouter.use('/admins' , require('./api/ApiAdmins'))
apiRouter.use('/categories' , require('./api/ApiCategories'))
apiRouter.use('/consumers' , require('./api/ApiConsumers'))
apiRouter.use('/orderedProducts' , require('./api/ApiOrderedProducts'))
apiRouter.use('/orders' , require('./api/ApiOrders'))
apiRouter.use('/products' , require('./api/ApiProducts'))
apiRouter.use('/productsForSell' , require('./api/ApiAds'))
apiRouter.use('/api/productionUnits' , require('./api/ApiProductionUnits'))
apiRouter.use('/subcategories' , require('./api/ApiSubCategories'))
apiRouter.use('/subsubcategories' , require('./api/ApiSubSubCategories'))
apiRouter.use('/api/suppliers' , require('./api/ApiSuppliers'))
apiRouter.use('/api/users' , require('./api/ApiUsers'))
apiRouter.use('/vehicles' , require('./api/ApiVehicles'))
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