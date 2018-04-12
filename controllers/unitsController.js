const unitsDB = require('../models/unitsDB');

module.exports = {

  unitIndex(req, res, next) {
    unitsDB.findAll()
      .then((unit) => {
        res.status(200).json({
          message: 'unit data loaded',
          data: { unit }
        });
      })
      .catch(err => next(err));
  },

  unitCreate(req, res, next) {
    unitsDB.save({
      unit: req.body.unit
    })
    .then((unit) => {
      res.json({
        message: 'New unit created',
        data: { unit }
      });
    })
    .catch(err => next(err));
  },

  unitGetOne(req, res, next) {
    unitsDB.findById(req.params.id)
      .then((unit) => {
        res.json({
          message: 'Find one unit',
          data: { unit }
        })
      }).catch(err => next(err));
  },

  unitUpdate(req, res, next) {
    unitsDB.update(req.body)
      .then((unit) => {
        res.json({
          message: 'unit updated',
          data: { unit }
        })
      })
      .catch(err => next(err));
  },

  unitDestroy(req, res, next) {
    unitsDB.destroy(req.params.id)
    .then(() => {
      res.json({
        message: 'expense has been deleted',
      })
    })
    .catch (err => next(err));
  }

};