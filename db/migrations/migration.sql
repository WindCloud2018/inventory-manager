\c inventory_db;

DROP TABLE IF EXISTS units;
DROP TABLE IF EXISTS inventories;

CREATE TABLE units (
  unit_id SERIAL PRIMARY KEY,
  unit VARCHAR(64)
);

CREATE TABLE inventories (
  inventory_id SERIAL PRIMARY KEY,
  inventory VARCHAR(128) NOT NULL,
  quantity REAL NOT NULL,
  cost_per_unit REAL NOT NULL,
  unit_id INT NOT NULL REFERENCES units(unit_id),
  low_stock BOOLEAN DEFAULT FALSE
);
