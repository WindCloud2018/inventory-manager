const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many(`
      SELECT *
      FROM expenses e
      INNER JOIN categories c
      ON e.category_id = c.category_id
      ORDER BY expense_date, expense_id ASC
    `);
  },

  findByCategoryId(id) {
    return db.many(`
      SELECT * FROM expenses e
      WHERE e.category_id = $1
    `, id);
  },

  findById(id) {
    return db.one(`
      SELECT * FROM expenses e
      WHERE e.id = $1
    `, id);
  },

  save(expense) {
  // console.log('this is landmark in model:', landmarks);
  console.log('models')
  return db.one(`
     INSERT INTO expenses (amount, description, category_id, expense_date) VALUES ($1, $2, $3, $4) RETURNING *
    `, [expense.amount, expense.description, expense.category_id, expense.expense_date]);
  },

  update(expense) {
    return db.one(`
      UPDATE expenses
      SET
        amount = $/amount/,
        description = $/description/,
        category_id = $/category_id/,
        expense_date = $/expense_date/
      WHERE expense_id = $/expense_id/
      RETURNING *
    `, expense);
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM expenses
      WHERE expense_id = $1
    `, id);
  },

};
