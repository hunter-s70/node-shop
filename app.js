const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ErrorsController = require('./controller/errors');
const mongoose = require('mongoose');

// const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware
app.use(bodyParser.urlencoded({extend: false}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('5e3079d196b06e1eb012a51a').then(user => {
//     req.user = new User({
//       id: user._id,
//       username: user.name,
//       email: user.email,
//       cart: user.cart
//     });
//     next();
//   }).catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(ErrorsController.get404);

mongoose.connect(`${process.env.DB_URL_MONGO}/${process.env.DB_NAME_MONGO}`).then(() => {
  app.listen(3000);
}).catch(err => console.log(err));
