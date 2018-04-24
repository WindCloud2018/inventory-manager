const inventoriesDB = require('../models/inventoriesDB');

module.exports = {

  inventoryIndex(req, res, next) {
    inventoriesDB.findAll()
      .then((inventories) => {
        res.status(200).json({
          message: 'Inventory data loaded',
          inventories
        });
      })
      .catch(err => next(err));
  },

  inventoryGetOne(req, res, next) {
    inventoriesDB.findById(req.params.id)
      .then((inventory) => {
        res.json({
          message: 'Find one inventory',
          inventory
        })
      }).catch(err => next(err));
  },

  // inventoryCreate(req, res, next) {
  //   inventoriesDB.save({
  //     inventory: req.body.inventory,
  //     quantity: req.body.quantity,
  //     cost_per_unit: req.body.cost_per_unit,
  //     unit_id: req.body.unit_id
  //   })
  //   .then((inventory) => {
  //     res.json({
  //       message: 'New inventory created',
  //       inventory
  //     });
  //   })
  //   .catch(err => next(err));
  // },

  inventoryUpdate(req, res, next) {
    console.log(req.body, 'this is update controller')
    inventoriesDB.update(req.body)
      .then((inventory) => {
        res.json({
          message: 'Inventory updated',
          inventory
        })
      })
      .catch(err => next(err));
  },

  // inventorySalesUpdate(req, res, next) {
  //   console.log("in inventory sales update controller", req.body)
  //   inventoriesDB.updateFromSales(req.body)
  //     .then((inventories) => {
  //       res.json({
  //         message: 'Inventories updated',
  //         inventories
  //       })
  //     })
  //     .catch(err => next(err));
  // },

  // inventoryDestroy(req, res, next) {
  //   inventoriesDB.destroy(req.params.id)
  //   .then(() => {
  //     res.json({
  //       message: 'expense has been deleted',
  //     })
  //   })
  //   .catch (err => next(err));
  // }

};
