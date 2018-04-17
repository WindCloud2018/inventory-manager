const express = require('express');
const usedItemsRoute = express.Router();
const usedItemsController = require('../controllers/usedItemsController');

usedItemsRoute.route('/:id')
  .get(usedItemsController.usedItemsGetOne)
  .put(usedItemsController.usedItemsUpdate)
  .delete(usedItemsController.usedItemsDestroy)

usedItemsRoute.route('/')
  .get(usedItemsController.usedItemsIndex)
  .post(usedItemsController.usedItemsCreate)

module.exports = usedItemsRoute;

