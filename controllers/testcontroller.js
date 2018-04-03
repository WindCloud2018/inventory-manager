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

  testCreate(req, res, next) {
    console.log(req.body);
    testDB.save({
      amount: req.body.amount,
      description: req.body.description,
      asset: req.body.asset,
      category_id: req.body.category_id,
    })
      .then((test) => {
        res.json({
          message: 'landmark added successfully!',
          data: { test },
        });
      })
      .catch(err => next(err));
  },
};
