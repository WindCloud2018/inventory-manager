\c inventory_db;

DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS inventories;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS inventory_costs;

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  patty INT NOT NULL,
  cheese INT NOT NULL,
  tomato INT NOT NULL,
  lettuce INT NOT NULL,
  bun INT NOT NULL,
  order_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE items (
  item_id SERIAL PRIMARY KEY,
  item TEXT NOT NULL
);

CREATE TABLE inventories (
  inventory_id SERIAL PRIMARY KEY,
  inventory VARCHAR(128) NOT NULL,
  inventory_quantity REAL NOT NULL,
  low_stock BOOLEAN DEFAULT FALSE,
  item_id INT NOT NULL REFERENCES items(item_id)
);

CREATE TABLE inventory_costs (
  inventory_cost_id SERIAL PRIMARY KEY,
  inventory_quantity REAL NOT NULL,
  cost_per_unit REAL NOT NULL,
  item_id INT NOT NULL REFERENCES items(item_id),
  inventory_date TIMESTAMP NOT NULL DEFAULT NOW()
);
