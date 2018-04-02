const express = require('express');

const testRoutes = express.Router();

const testController = require('../controllers/testcontroller');

testRoutes.route('/')
  .get(testController.index);

module.exports = testRoutes;
