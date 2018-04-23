const ordersDB = require('../models/ordersDB');

module.exports = {

  orderIndex(req, res, next) {
    ordersDB.findAll()
      .then((orders) => {
        res.status(200).json({
          message: 'order data loaded',
          orders
        });
      })
      .catch(err => next(err));
  },

  orderGetOne(req, res, next) {
    ordersDB.findById(req.params.id)
      .then((order) => {
        res.json({
          message: 'Find one order',
          order
        })
      }).catch(err => next(err));
  },

  orderCreate(req, res, next) {
    ordersDB.save({
      order_date: req.body.currentDate
    })
    .then(() => (
      ordersDB.findLastOrderId()
    ))
    .then((last_order) => {
      res.json({
        message: 'New order created',
        last_order
      });
    })
    .catch(err => next(err));
  },

  orderUpdate(req, res, next) {
    ordersDB.update(req.body)
      .then((order) => {
        res.json({
          message: 'order updated',
          order
        })
      })
      .catch(err => next(err));
  },

  orderDestroy(req, res, next) {
    ordersDB.destroy(req.params.id)
    .then(() => {
      res.json({
        message: 'order has been deleted',
      })
    })
    .catch (err => next(err));
  }

};
