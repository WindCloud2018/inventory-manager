const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many (`
      SELECT *
      FROM orders
      ORDER BY order_id ASC
    `);
  },

  findById(id) {
    return db.one(`
      SELECT *
      FROM orders
      WHERE order_id = $1
    `, id);
  },

  save(order) {
    return db.one(`
      INSERT INTO orders (
        order_quantity,
        patty_used,
        cheese_used,
        tomato_used,
        lettuce_used,
        bun_used
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [order.order_quantity, order.patty_used, order.cheese_used, order.tomato_used, order.lettuce_used, order.bun_used]);
  },

  update(order) {
    return db.one(`
      UPDATE orders
      SET
        order = $/order/
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
