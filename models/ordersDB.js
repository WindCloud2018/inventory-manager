const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many(`
      SELECT *
      FROM orders o
      ORDER BY order_id DESC
    `);
  },

  findLastOrderId() {
    return db.one(`
      SELECT *
      FROM orders
      ORDER BY order_id DESC LIMIT 1
    `);
  },

  findById(id) {
    return db.one(`
      SELECT *
      FROM orders o
      INNER JOIN used_items u
      ON o.order_id = u.order_id
      INNER JOIN items i
      ON u.item_id = i.item_id
      WHERE order_id = $1
    `, id);
  },

  save(order) {
    return db.one(`
      INSERT INTO orders
        (order_date)
       VALUES ($1)
      RETURNING *
    `, [order.order_date]);
  },

  update(order) {
    return db.one(`
      UPDATE orders
      SET
        order_date = $/order_date/
      WHERE order_id = $/order_id/
      RETURNING *
    `, order);
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM orders
      WHERE order_id = $1
    `, id);
  }

};
