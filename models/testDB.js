const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many(`
      SELECT *
      FROM balances
      ORDER BY id DESC
    `);
  }

};
