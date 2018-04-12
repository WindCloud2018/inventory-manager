const express = require('express');
const unitsRoute = express.Router();
const unitsController = require('../controllers/unitsController');

unitsRoute.route('/:id')
  .get(unitsController.unitGetOne)
  .put(unitsController.unitUpdate)
  .delete(unitsController.unitDestroy)

unitsRoute.route('/')
  .get(unitsController.unitIndex)
  .post(unitsController.unitCreate)

module.exports = unitsRoute;
