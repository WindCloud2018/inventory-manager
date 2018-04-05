const db = require('../db/config');

module.exports = {

  findAll() {
    return db.many(`
      SELECT *
      FROM testers
      ORDER BY id
    `);
  },

  findOne(id) {
    return db.many(`
      SELECT *
      FROM testers
      WHERE testers.id = $1
    `, id);
  },

  save(test) {
    return db.one(`
       INSERT INTO testers (title, description) VALUES ($1 ,$2) RETURNING *
    `, [test.title, test.description]);
  },

  update(test) {
    return db.one(`
      UPDATE testers
      SET
      title = $/title/
      description = $/description/
      WHERE id = $/id/
      RETURNING *
    `, test);
  },

  destroy(id) {
    return db.none(`
      DELETE
      FROM testers
      WHERE id = $1
    `, id);
  },

};
