const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many (`
      SELECT *
      FROM used_items u
      INNER JOIN orders o
      ON u.order_id = o.order_id
      INNER JOIN items i
      ON i.item_id = u.item_id
      ORDER BY used_items_id ASC
    `);
  },

  findById(id) {
    return db.one(`
      SELECT *
      FROM used_items u
      INNER JOIN orders o
      ON u.order_id = o.order_id
      INNER JOIN items i
      ON i.item_id = u.item_id
      WHERE order_id = $1
    `, id);
  },

  save(used_item) {
    return db.one(`
      INSERT INTO used_items
        (item_id, order_id, used_quantity)
       VALUES ($1, $2, $3)
      RETURNING *
    `, [used_item.item_id, used_item.order_id, used_item.used_quantity]);
  },

  update(used_item) {
    return db.one(`
      UPDATE used_items
      SET
        item_id = $/item_id/
        order_id = $/order_id/
        used_quantity = $/used_quantity/
      WHERE used_items_id = $/used_items_id/
      RETURNING *
    `, used_item);
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM used_items
      WHERE used_items_id = $1
    `, id);
  }

};
