\c inventory_db;

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS units;
DROP TABLE IF EXISTS inventories;

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  order_quantity INT NOT NULL,
  patty_used INT NOT NULL,
  cheese_used INT NOT NULL,
  tomato_used INT NOT NULL,
  lettuce_used INT NOT NULL,
  bun_used INT NOT NULL,
  order_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE units (
  unit_id SERIAL PRIMARY KEY,
  unit VARCHAR(64) NOT NULL
);

CREATE TABLE inventories (
  inventory_id SERIAL PRIMARY KEY,
  inventory VARCHAR(128) NOT NULL,
  inventory_quantity REAL NOT NULL,
  cost_per_unit REAL NOT NULL,
  unit_id INT NOT NULL REFERENCES units(unit_id),
  low_stock BOOLEAN DEFAULT FALSE
);
