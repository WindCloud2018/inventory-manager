const express = require('express');
const inventoryRoutes = express.Router();
const inventoryController = require('../controllers/inventoryController');

inventoryRoutes.route('/:id')
  .get(inventoryController.inventoryGetOne)
  .put(inventoryController.inventoryUpdate)
  .delete(inventoryController.inventoryDestroy)

inventoryRoutes.route('/')
  .get(inventoryController.inventoryIndex)
  .post(inventoryController.inventoryCreate)

module.exports = inventoryRoutes;
