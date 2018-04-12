\c inventory_db;

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


INSERT INTO inventories(inventory, quantity, cost_per_unit, unit_id, low_stock)
  VALUES
  (
    'bun',
    100,
    2,
    9,
    'false'
  ),
  (
    'lettuce',
    50,
    5,
    5,
    'false'
  ),
  (
    'tomato',
    40,
    1,
    5,
    'false'
  ),
  (
    'cheese',
    50,
    3,
    8,
    'false'
  );
