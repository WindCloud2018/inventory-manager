const itemsDB = require('../models/itemsDB');

module.exports = {

  itemIndex(req, res, next) {
    itemsDB.findAll()
      .then((items) => {
        res.status(200).json({
          message: 'Item data has been loaded',
          items
        });
      })
      .catch(err => next(err));
  },

  itemGetOne(req, res, next) {
    itemsDB.findById(req.params.id)
      .then((item) => {
        res.json({
          message: "Found one item"
          item
        })
      })
      .catch(err => next(err));
  },

  itemCreate(req, res, next) {
    itemsDB.save({
      item: req.body.item
    })
    .then((item) => {
      res.json({
        message: "New item created",
        item
      });
    })
    .catch(err => next(err));
  },

  itemUpdate(req, res, next) {
    itemsDB.update(req.body)
      .then((item) => {
        res.json({
          message: 'Item updated',
          item
        });
      })
      .catch(err => next(err));
  },

  itemDestroy(req, res, next) {
    itemsDB.delete(req.params.id)
    .then(() => {
      res.json({
        message: 'Item has been deleted',
      });
    })
    .catch(err => next(err));
  }

};







