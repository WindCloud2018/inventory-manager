\c pocketdb;

DROP TABLE IF EXISTS balances;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  category VARCHAR(64)
);

CREATE TABLE balances (
  id SERIAL PRIMARY KEY,
  amount INT NOT NULL,
  description VARCHAR(128),
  asset BOOLEAN NOT NULL,
  category_id INT REFERENCES categories(id),
  data_created TIMESTAMP NOT NULL DEFAULT NOW()
);
