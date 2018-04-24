const express = require('express');

const itemsRoute = express.Router();
const itemsController = require('../controllers/itemsController');

itemsRoute.route('/:id')
  .get(itemsController.itemGetOne)
  .put(itemsController.itemUpdate)
  .delete(itemsController.itemDestroy)

itemsRoute.route('/')
  .get(itemsController.itemIndex)
  .post(itemsController.itemCreate)


module.exports = itemsRoute;
