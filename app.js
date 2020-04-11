const dotenv = require('dotenv').config();
const express = require('express');
const csrf = require('csurf');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const ErrorsController = require('./controller/errors');

const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGO_URI = `${process.env.DB_URL_MONGOOSE}/${process.env.DB_NAME_MONGOOSE}`;

const User = require('./models/user');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const app = express();
const store = new MongoDBStore({
  uri: MONGO_URI,
  collections: 'sessions'
});

const csrfProctection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

// middleware
app.use(cookieParser()); // allows to get data from `req.cookie.email`
app.use(bodyParser.urlencoded({extend: false})); // allows to get data from `req.body.email`
app.use(express.static(path.join(__dirname, 'public'))); // set static folder
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProctection);

app.use((req, res, next) => {
  if (!req.session.user) return next();
  User.findById(req.session.user._id).then(user => {
    req.user = user;
    next();
  }).catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(ErrorsController.get404);

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
