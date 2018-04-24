const express = require('express');
const inventoriesRoute = express.Router();
const inventoriesController = require('../controllers/inventoriesController');

inventoriesRoute.route('/:id')
  .get(inventoriesController.inventoryGetOne)
  .put(inventoriesController.inventoryUpdate)

inventoriesRoute.route('/')
  .get(inventoriesController.inventoryIndex)
  // // special route to pass in data for multiple PUT method on database
  // .put(inventoriesController.inventorySalesUpdate)


module.exports = inventoriesRoute;
