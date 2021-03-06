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
    '2016-11-16'
  ),
  (
    '2016-11-16'
  ),
  (
    '2016-12-16'
  ),
  (
    '2017-01-16'
  ),
  (
    '2017-01-16'
  ),
  (
    '2017-01-16'
  ),
  (
    '2017-02-16'
  ),
  (
    '2017-03-16'
  ),
  (
    '2017-04-16'
  ),
  (
    '2017-05-16'
  ),
  (
    '2017-06-16'
  ),
  (
    '2017-06-16'
  ),
  (
    '2017-06-16'
  ),
  (
    '2017-07-16'
  ),
  (
    '2017-07-16'
  ),
  (
    '2017-08-16'
  ),
  (
    '2017-09-16'
  ),
  (
    '2017-11-16'
  ),
  (
    '2018-01-16'
  ),
  (
    '2018-02-16'
  ),
  (
    '2018-02-16'
  ),
  (
    '2018-03-16'
  ),
  (
    '2018-04-16'
  ),
  (
    '2018-04-16'
  ),
  (
    '2018-04-16'
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
    60,
    1
  ),
  (
    60,
    2
  ),
  (
    60,
    3
  ),
  (
    60,
    4
  ),
  (
    51,
    5
  );


INSERT INTO inventory_costs(inventory_quantity, cost_per_unit, item_id, inventory_date)
VALUES
(
  100,
  1.05,
  1,
  '2018-04-20'
),
(
  100,
  0.52,
  2,
  '2018-04-20'
),
(
  100,
  0.12,
  3,
  '2018-04-20'
),
(
  200,
  0.14,
  4,
  '2018-04-20'
),
(
  200,
  0.50,
  5,
  '2018-04-20'
),

(
  150,
  .75,
  1,
  '2017-04-20'
),
(
  150,
  0.50,
  2,
  '2017-04-20'
),
(
  150,
  0.15,
  3,
  '2017-04-20'
),
(
  200,
  0.20,
  4,
  '2017-04-20'
),
(
  200,
  0.75,
  5,
  '2017-04-20'
),

(
  150,
  .70,
  1,
  '2016-04-20'
),
(
  150,
  0.40,
  2,
  '2016-04-20'
),
(
  150,
  0.10,
  3,
  '2016-04-20'
),
(
  200,
  0.10,
  4,
  '2016-04-20'
),
(
  200,
  0.50,
  5,
  '2016-04-20'
);








