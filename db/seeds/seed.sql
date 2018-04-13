\c inventory_db;

INSERT INTO orders(patty, cheese, tomato, lettuce, bun)
  VALUES
  (
    2,
    2,
    4,
    2,
    2
  ),
  (
    3,
    2,
    2,
    1,
    1
  ),
  (
    6,
    6,
    12,
    8,
    6
  ),
  (
    5,
    3,
    4,
    2,
    1
  );

INSERT INTO items(item)
VALUES
(
  'Bun'
),
(
  'Patty'
),
(
  'Lettuce'
),
(
  'Tomato'
),
(
  'Cheese'
);

INSERT INTO inventories(inventory, inventory_quantity, item_id)
  VALUES
  (
    'Bun',
    100,
    1
  ),
  (
    'Patty',
    100,
    2
  ),
  (
    'Lettuce',
    100,
    3
  ),
  (
    'Tomato',
    200,
    4
  ),
  (
    'Cheese',
    200,
    5
  );


INSERT INTO inventory_costs(inventory_quantity, cost_per_unit, inventory_purchase, item_id)
VALUES
(
  100,
  105,
  1
),
(
  100,
  52,
  2
),
(
  100,
  12,
  3
),
(
  200,
  14,
  4
),
(
  200,
  50,
  5
);
