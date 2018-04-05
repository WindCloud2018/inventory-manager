const testDB = require('../models/testDB');

module.exports = {
  index(req, res, next) {
    testDB.findAll()
      .then((test) => {
        res.status(200).json({
          data: { test }
        });
      })
      .catch(err => next(err));
  },

  getOne(req, res, next) {
    testDB.findOne(req.params.id)
      .then((test) => {
        res.status(200).json({
          data: { test }
        });
      })
      .catch(err => next(err));
  },

  testCreate(req, res, next) {
    testDB.save({
      title: req.body.title,
      description: req.body.description
    })
      .then((test) => {
        res.json({
          data: { test },
        });
      })
      .catch(err => next(err));
  },

  testUpdate(req, res, next) {
    testDB.findOne(req.params.id)
      .then((test) => {
        return test.update({
          title: req.body.title,
          description: req.body.description
        });
      })
      .then((test) => {
        res.status(202).json({
          data: { test }
        });
      })
      .catch(err => next(err));
  },

  testDelete(req, res, next) {
    testDB.destroy(req.params.id)
      .then(() => {
        res.status(202).json({
          message: 'Test deleted',
        });
      })
      .catch(err => next(err));
  }
};
