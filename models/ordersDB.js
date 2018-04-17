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
        patty,
        cheese,
        tomato,
        lettuce,
        bun
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [order.patty, order.cheese, order.tomato, order.lettuce, order.bun]);
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
