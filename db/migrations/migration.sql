\c tester_db;

DROP TABLE IF EXISTS testers;

CREATE TABLE testers (
  id SERIAL PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  description VARCHAR(128) NOT NULL
);
