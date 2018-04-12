const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many (`
      SELECT *
      FROM units
      ORDER BY unit_id ASC
    `);
  },

  findById(id) {
    return db.one(`
      SELECT *
      FROM units
      WHERE unit_id = $1
    `, id);
  },

  save(unit) {
    return db.one(`
      INSERT INTO units (
        unit
      ) VALUES ($1)
      RETURNING *
    `, [unit.unit]);
  },

  update(unit) {
    return db.one(`
      UPDATE units
      SET
        unit = $/unit/
      WHERE unit_id = $/unit_id/
      RETURNING *
    `, unit);
  },

  destroy(id) {
    return db.none(`
      DELETE
        FROM units
      WHERE unit_id = $1
    `, id);
  }

};
