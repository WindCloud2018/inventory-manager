const express = require('express');
const inventoriesRoute = express.Router();
const inventoriesController = require('../controllers/inventoriesController');

inventoriesRoute.route('/:id')
  .get(inventoriesController.inventoryGetOne)
  .put(inventoriesController.inventoryUpdate)

inventoriesRoute.route('/')
  .get(inventoriesController.inventoryIndex)


module.exports = inventoriesRoute;
