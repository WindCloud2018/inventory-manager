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
    console.log(inventory, 'this is coming from MODELS')
    return db.one(`
      UPDATE inventories
      SET
        inventory_quantity = inventory_quantity + $/inventory_quantity/,
        item_id = $/item_id/
      WHERE inventory_id = $/item_id/
      RETURNING *
    `, inventory);
  },


  deductFromSales(inventoryUpdate) {
    return db.any(`
      UPDATE inventories
      SET inventory_quantity = inventory_quantity - $/used_quantity/
      WHERE inventory_id = $/item_id/
    `, inventoryUpdate);
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM inventories
      WHERE inventory_id = $1
    `, id);
  }

};
