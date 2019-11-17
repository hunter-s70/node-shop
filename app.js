const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ErrorsController = require('./controller/errors');

const db = require('./util/database');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

db.execute('SELECT * FROM products').then(result => {
  console.log(result[0]);
}).catch(err => {
  console.log(err);
});

app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware
app.use(bodyParser.urlencoded({extend: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(ErrorsController.get404);

app.listen(3000);
