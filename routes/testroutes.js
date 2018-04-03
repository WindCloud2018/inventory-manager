const express = require('express');

const testRoutes = express.Router();

const testController = require('../controllers/testcontroller');

testRoutes.route('/')
  .get(testController.index)
  .post(testController.testCreate);

module.exports = testRoutes;
