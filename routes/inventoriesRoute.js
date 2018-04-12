const express = require('express');
const inventoriesRoute = express.Router();
const inventoriesController = require('../controllers/inventoriesController');

inventoriesRoute.route('/:id')
  .get(inventoriesController.inventoryGetOne)
  .put(inventoriesController.inventoryUpdate)
  .delete(inventoriesController.inventoryDestroy)

inventoriesRoute.route('/')
  .get(inventoriesController.inventoryIndex)
  .post(inventoriesController.inventoryCreate)

module.exports = inventoriesRoute;
