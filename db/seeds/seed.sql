\c pocketdb;

INSERT INTO categories(category)
  VALUES
  (
    'Income'
  ),
  (
    'Rent'
  );

INSERT INTO balances(amount, description, asset, category_id)
  VALUES
  (
    50000,
    'Work',
    TRUE,
    1
  ),
  (
    2000,
    'Rent',
    FALSE,
    2
  );
