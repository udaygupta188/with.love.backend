const express = require('express');
const router = express.Router();
const orderController = require('./order.controller')


router.get('/orders', orderController.getOrders);
router.get('/:userId/orders', orderController.getUserOrders);
router.get('/order/:id', orderController.getOrderDetail);

module.exports = router;