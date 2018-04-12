const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many (`
      SELECT *
      FROM inventories i
      INNER JOIN units u
      ON i.unit_id = u.unit_id
      ORDER BY inventory_id
    `);
  },

  findById(id) {
    return db.one(`
      SELECT *
      FROM inventories i
      WHERE i.inventory_id = $1
    `, id);
  },

  save(inventory) {
    return db.one(`
      INSERT INTO inventories (
        inventory,
        quantity,
        cost_per_unit,
        unit_id
      ) VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [inventory.inventory, inventory.quantity, inventory.cost_per_unit, inventory.unit_id]);
  },

  update(inventory) {
    return db.one(`
      UPDATE inventories
      SET
        inventory = $/inventory/,
        quantity = $/quantity/,
        cost_per_unit = $/cost_per_unit/,
        unit_id = $/unit_id/
      WHERE inventory_id = $/inventory_id/
      RETURNING *
    `, inventory);
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM inventories
      WHERE inventory_id = $1
    `, id);
  }

};
