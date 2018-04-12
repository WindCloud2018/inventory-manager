const express = require('express');
const ordersRoute = express.Router();
const ordersController = require('../controllers/ordersController');

ordersRoute.route('/:id')
  .get(ordersController.orderGetOne)
  .put(ordersController.orderUpdate)
  .delete(ordersController.orderDestroy)

ordersRoute.route('/')
  .get(ordersController.orderIndex)
  .post(ordersController.orderCreate)

module.exports = ordersRoute;
