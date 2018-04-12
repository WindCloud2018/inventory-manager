const express = require('express');
const unitRoutes = express.Router();
const unitController = require('../controllers/unitController');

unitRoutes.route('/:id')
  .get(unitController.unitGetOne)
  .put(unitController.unitUpdate)
  .delete(unitController.unitDestroy)

unitRoutes.route('/')
  .get(unitController.unitIndex)
  .post(unitController.unitCreate)

module.exports = unitRoutes;
