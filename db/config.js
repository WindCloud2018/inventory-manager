// Connecting database and localhost

const options = {
  query: (e) => {
    console.log(e.query);
  },
};

const pgp = require('pg-promise')(options);

const config = {
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
};

function setDatabase() {
  return pgp(process.env.DATABASE_URL || config);
}

const db = setDatabase();

module.exports = db;

