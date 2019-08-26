const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// middleware
app.use(bodyParser.urlencoded({extend: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.get((req, res) => {
  res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);
