\c inventory_db;

INSERT INTO orders(order_quantity, patty_used, cheese_used, tomato_used, lettuce_used, bun_used)
  VALUES
  (
    2,
    2,
    2,
    4,
    2,
    2
  ),
  (
    1,
    3,
    2,
    2,
    1,
    1
  ),
  (
    6,
    6,
    6,
    12,
    8,
    6
  ),
  (
    1,
    5,
    3,
    4,
    2,
    1
  );

INSERT INTO units(unit)
  VALUES
  ( 'ounce' ),
  ( 'pint' ),
  ( 'quarter' ),
  ( 'gallon' ),
  ( 'pound' ),
  ( 'kilogram' ),
  ( 'fluid ounce'),
  ( 'pack' ),
  ( 'bag' ),
  ( 'box' );


INSERT INTO inventories(inventory, inventory_quantity, cost_per_unit, unit_id)
  VALUES
  (
    'bun',
    100,
    2,
    9
  ),
  (
    'patty',
    100,
    2,
    8
  ),
  (
    'lettuce',
    50,
    5,
    5
  ),
  (
    'tomato',
    40,
    1,
    5
  ),
  (
    'cheese',
    50,
    3,
    8
  );
