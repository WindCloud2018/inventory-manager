const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many (`
      SELECT *
      FROM inventories inv
      INNER JOIN items i
      ON inv.item_id = i.item_id
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
        inventory_quantity,
        item_id,
      ) VALUES ($1, $2)
      RETURNING *
    `, [inventory.quantity, item_id]);
  },

  update(inventory) {
    return db.one(`
      UPDATE inventories
      SET
        inventory_quantity = $/inventory_quantity/
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
