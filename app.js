const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ErrorsController = require('./controller/errors');
const mongoose = require('mongoose');

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware
app.use(cookieParser()); // allows to get data from `req.cookie.email`
app.use(bodyParser.urlencoded({extend: false})); // allows to get data from `req.body.email`
app.use(express.static(path.join(__dirname, 'public'))); // set static folder

app.use((req, res, next) => {
  User.findById('5e69551ae411fd1da470ca36').then(user => {
    req.user = user;
    next();
  }).catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(ErrorsController.get404);

mongoose.connect(`${process.env.DB_URL_MONGOOSE}/${process.env.DB_NAME_MONGOOSE}`).then(() => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'TestUser',
        email: 'test@mail.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  });
  app.listen(3000);
}).catch(err => console.log(err));
