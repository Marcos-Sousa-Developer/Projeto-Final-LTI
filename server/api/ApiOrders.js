const express = require('express');
const router = express.Router(); 
const orderController = require('../controllers/OrderController');

//Get all orders
router.get('/', orderController.getAllOrders)

//Delete order by id
router.delete('/:id', orderController.deleteOrderByID)

//Add order
router.post('/order', orderController.insertOrder)

//Update order by id
router.put('/:id', orderController.updateOrderByID) 

module.exports = router