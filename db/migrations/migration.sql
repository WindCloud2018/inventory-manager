\c inventory_db;


DROP TABLE IF EXISTS inventory_costs;
DROP TABLE IF EXISTS inventories;
DROP TABLE IF EXISTS used_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS items;


CREATE TABLE items (
  item_id SERIAL PRIMARY KEY,
  item TEXT NOT NULL
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  order_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE used_items (
  used_items_id SERIAL PRIMARY KEY,
  item_id INT NOT NULL REFERENCES items(item_id),
  order_id INT NOT NULL REFERENCES orders(order_id),
  used_quantity INT NOT NULL,
  used_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE inventories (
  inventory_id SERIAL PRIMARY KEY,
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










