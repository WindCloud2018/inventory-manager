const inventoryCostsDB = require('../models/inventoryCostsDB');


module.exports = {

  inventoryCostIndex(req, res, next) {
    inventoryCostsDB.findAll()
      .then((inventory_costs) => {
        res.status(200).json({
          message: 'Inventory costs data loaded',
          inventory_costs
        });
      })
      .catch(err => next(err));
  },

  inventoryCostGetOne(req, res, next) {
    inventoryCostsDB.findById(req.params.id)
      .then((inventory_cost) => {
        res.json({
          message: 'Found one inventory cost',
          inventory_cost
        })
      })
      .catch(err => next(err));
  },

  inventoryCostCreate(req, res, next) {
    inventoryCostsDB.save({
      inventory_quantity: req.body.inventory_quantity,
      cost_per_unit: req.body.cost_per_unit,
      item_id: req.body.item_id
    })
    .then((inventory_cost) => {
      res.json({
        message: 'New inventory cost quantity added',
        inventory_cost
      });
    })
    .catch(err => next(err));
  },

  inventoryCostUpdate(req, res, next) {
    inventoryCostsDB.update(req.body)
      .then((inventory_cost) => {
        res.json({
          message: 'InventoryCost updated',
          inventory_cost
        });
      })
      .catch(err => next(err));
  },

  inventoryCostDestroy(req, res, next) {
    inventoryCostsDB.destroy(req.params.id)
    .then(() => {
      res.json({
        message: 'Inventory Cost has been destroyed',
        inventoryCost
      });
    })
    .catch(err => next(err));
  }

};
