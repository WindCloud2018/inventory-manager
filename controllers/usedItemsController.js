const usedItemsDB = require('../models/usedItemsDB');
const inventoriesDB = require('../models/inventoriesDB');

module.exports = {

  usedItemsIndex(req, res, next) {
    usedItemsDB.findAll()
      .then((usedItems) => {
        res.status(200).json({
          message: 'usedItems data loaded',
          usedItems
        });
      })
      .catch(err => next(err));
  },

  usedItemsGetOne(req, res, next) {
    usedItemsDB.findById(req.params.id)
      .then((usedItem) => {
        res.json({
          message: 'Find one usedItems',
          usedItem
        })
      }).catch(err => next(err));
  },

  usedItemsCreate(req, res, next) {
    // iterate through data from client side.
    for (let key in req.body) {
      const itemId = req.body[key]['id']
      // if object has itemId and have quantity more than 0, create new row in used_items table.
      if ((itemId !== undefined) && (req.body[key]['quantity'] > 0)) {
        const newUsedItemData = {
          item_id: req.body[key]['id'],
          order_id: req.body.latestOrderId,
          used_quantity: req.body[key]['quantity'],
        }
        usedItemsDB.save(newUsedItemData)
          // run second query in same object loop to update inventory quantity from quantity used.
          .then((newUsedItemData) => {
            inventoriesDB.deductFromSales(newUsedItemData)
            .catch(err => next(err));
          })
          .catch(err => next(err));
      };
    }
  },

  usedItemsUpdate(req, res, next) {
    usedItemsDB.update(req.body)
      .then((usedItem) => {
        res.json({
          message: 'usedItems updated',
          usedItem
        })
      })
      .catch(err => next(err));
  },

  usedItemsDestroy(req, res, next) {
    usedItemsDB.destroy(req.params.id)
    .then(() => {
      res.json({
        message: 'usedItem has been deleted',
      })
    })
    .catch (err => next(err));
  }

};
