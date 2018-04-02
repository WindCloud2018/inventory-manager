const testDB = require('../models/testDB');

module.exports = {
  index(req, res, next) {
    testDB.findAll()
      .then((test) => {
        res.status(200).json({
          data: {
            test,
          },
        });
      })
      .catch(err => next(err));
  }
};
