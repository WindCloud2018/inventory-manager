const express = require('express');
const inventoryCostsRoute = express.Router();
const inventoryCostsController = require('../controllers/inventoryCostsController');

inventoryCostsRoute.route('/:id')
  .get(inventoryCostsController.inventoryCostGetOne)
  .put(inventoryCostsController.inventoryCostUpdate)
  .delete(inventoryCostsController.inventoryCostDestroy)


inventoryCostsRoute.route('/')
  .get(inventoryCostsController.inventoryCostIndex)
  .post(inventoryCostsController.inventoryCostCreate)



module.exports = inventoryCostsRoute;
