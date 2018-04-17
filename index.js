!('NODE_ENV' in process.env) && require('dotenv').config();
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 5000;

const ordersRoute = require('./routes/ordersRoute');
const usedItemsRoute = require('./routes/usedItemsRoute');
const inventoriesRoute = require('./routes/inventoriesRoute');
const inventoryCostsRoute = require('./routes/inventoryCostsRoute');
const itemsRoute = require('./routes/itemsRoute');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/orders', ordersRoute);
app.use('/api/useditems', usedItemsRoute);

app.use('/api/inventories', inventoriesRoute);

app.use('/api/inventoryCosts', inventoryCostsRoute);

app.use('/api/items', itemsRoute);

// the "catchall" handeler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port);
