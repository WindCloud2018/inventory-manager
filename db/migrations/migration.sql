\c inventory_db;

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS units;
DROP TABLE IF EXISTS inventories;

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  patty INT NOT NULL,
  cheese INT NOT NULL,
  tomato INT NOT NULL,
  lettuce INT NOT NULL,
  bun INT NOT NULL,
  order_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE inventories (
  inventory_id SERIAL PRIMARY KEY,
  inventory VARCHAR(128) NOT NULL,
  inventory_quantity REAL NOT NULL,
  cost_per_unit REAL NOT NULL,
  bulk_price REAL NOT NULL,
  low_stock BOOLEAN DEFAULT FALSE
);
