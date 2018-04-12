const ordersDB = require('../models/ordersDB');

module.exports = {

  orderIndex(req, res, next) {
    ordersDB.findAll()
      .then((orders) => {
        res.status(200).json({
          message: 'order data loaded',
          data: { orders }
        });
      })
      .catch(err => next(err));
  },

  orderGetOne(req, res, next) {
    ordersDB.findById(req.params.id)
      .then((order) => {
        res.json({
          message: 'Find one order',
          data: { order }
        })
      }).catch(err => next(err));
  },

  orderCreate(req, res, next) {
    ordersDB.save({
      order_quantity: req.body.order_quantity,
      patty_used: req.body.patty_used,
      cheese_used: req.body.cheese_used,
      tomato_used: req.body.tomato_used,
      lettuce_used: req.body.lettuce_used,
      bun_used: req.body.bun_used
    })
    .then((order) => {
      res.json({
        message: 'New order created',
        data: { order }
      });
    })
    .catch(err => next(err));
  },

  orderUpdate(req, res, next) {
    ordersDB.update(req.body)
      .then((order) => {
        res.json({
          message: 'order updated',
          data: { order }
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
