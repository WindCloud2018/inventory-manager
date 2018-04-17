const db = require('../db/config');

module.exports = {
  findAll() {
    return db.many(`
      SELECT *
      FROM items
      ORDER by items_id ASC
    `);
  },

  findById(id) {
    return db.one(`
      SELECT *
      FROM orders
      WHERE order_id = $1
    `, id);
  },

  save(item) {
    return db.one(`
      INSERT INTO items (item)
      VALUES ($1)
      RETURNING *
    `,[item.item]);
  },

  update(item) {
    return db.one(`
      UPDATE items
      SET
        item = $/item/
      WHERE item_id = $/item_id/
      RETURNING *
    `, item);
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM items
      WHERE item_id = $1
    `,id);
  }

};









