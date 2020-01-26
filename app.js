const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ErrorsController = require('./controller/errors');

const mongoConnect = require('./util/database').mongoConnect;

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware
app.use(bodyParser.urlencoded({extend: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // User.findOne({
  //   where: {id: 1}
  // }).then(user => {
  //   req.user = user;
  //   next();
  // }).catch(err => console.log(err))
  next();
});

app.use('/admin', adminRoutes);
// app.use(shopRoutes);

app.use(ErrorsController.get404);

mongoConnect(() => {
  app.listen(3000);
});
