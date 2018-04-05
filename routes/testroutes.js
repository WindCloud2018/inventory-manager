const express = require('express');

const testRoutes = express.Router();

const testController = require('../controllers/testcontroller');

testRoutes.route('/:id')
  .get(testController.getOne)
  .put(testController.testUpdate)
  .delete(testController.testDelete);

testRoutes.route('/')
  .get(testController.index)
  .post(testController.testCreate);

module.exports = testRoutes;
