const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many(`
      SELECT *
      FROM inventory_costs ic
      INNER JOIN items i
      ON ic.item_id = i.item_id
      ORDER BY inventory_date, inventory_cost_id ASC
    `);
  },

  findByItemId(id) {
    return db.many(`
      SELECT * FROM inventory_costs ic
      WHERE ic.item_id = $1
    `, id);
  },

  findById(id) {
    return db.one(`
      SELECT * FROM inventory_costs ic
      WHERE ic.id = $1
    `, id);
  },

  save(inventory_cost) {
    return db.one(`
      INSERT INTO inventory_costs (inventory_quantity, cost_per_unit, item_id) VALUES ($1, $2, $3)
      RETURNING *
    `, [inventory_cost.inventory_quantity, inventory_cost.cost_per_unit, inventory_cost.item_id]);
  },

  update(inventory_cost) {
    return db.one(`
      UPDATE inventory_costs
      SET
        inventory_quantity = $/inventory_quantity/,
        cost_per_unit = $/cost_per_unit/,
        item_id = $/item_id/
      WHERE inventory_cost_id = $/inventory_cost_id/
      RETURNING *
    `, inventory_cost);
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM inventory_costs
      WHERE inventory_cost_id = $1
    `, id);
  }

};

