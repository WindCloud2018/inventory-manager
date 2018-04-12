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


INSERT INTO inventories(inventory, quantity, cost_per_unit, unit_id)
  VALUES
  (
    'bun',
    100,
    2,
    9
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
