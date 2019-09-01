const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// middleware
app.use(bodyParser.urlencoded({extend: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res) => {
  // res.status(404).send('<h1>Page not found</h1>');
  res.sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
