\c inventory_db;

INSERT INTO items(item, selectable)
VALUES
(
  'bun',
  FALSE
),
(
  'patty',
  TRUE
),
(
  'lettuce',
  TRUE
),
(
  'tomato',
  TRUE
),
(
  'cheese',
  TRUE
);

INSERT INTO orders(order_date)
  VALUES
  (
    '2018-04-16'
  ),
  (
    '2018-03-16'
  );

INSERT INTO used_items(item_id, order_id, used_quantity)
  VALUES
  (
    1,
    1,
    1
  ),
  (
    2,
    1,
    1
  ),
  (
    3,
    1,
    1
  ),
  (
    4,
    1,
    1
  ),
  (
    5,
    1,
    1
  ),
  (
    1,
    2,
    1
  ),
  (
    2,
    2,
    2
  ),
  (
    3,
    2,
    3
  ),
  (
    4,
    2,
    2
  ),
  (
    5,
    2,
    1
  );

INSERT INTO inventories(inventory_quantity, item_id)
  VALUES
  (
    100,
    1
  ),
  (
    100,
    2
  ),
  (
    100,
    3
  ),
  (
    200,
    4
  ),
  (
    200,
    5
  );


INSERT INTO inventory_costs(inventory_quantity, cost_per_unit, item_id)
VALUES
(
  100,
  1.05,
  1
),
(
  100,
  0.52,
  2
),
(
  100,
  0.12,
  3
),
(
  200,
  0.14,
  4
),
(
  200,
  0.50,
  5
);








