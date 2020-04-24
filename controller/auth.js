const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: process.env.SEND_GRID_KEY
  }
}));

exports.getLoginPage = (req, res, next) => {
  const errors = req.flash('error');
  const message = errors.length ? errors[0] : null;
  res.render('auth/login', {
    pageTitle: 'Login page',
    path: '/login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  const errors = req.flash('error');
  const message = errors.length ? errors[0] : null;
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email})
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      return bcrypt.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({email})
    .then((userDoc) => {
      if (userDoc) {
        req.flash('error', 'E-mail exists, please pick a different one.');
        return res.redirect('/signup');
      }
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email,
            password: hashedPassword,
            cart: {
              items: []
            }
          });
          return user.save();
        })
        .then(() => {
          res.redirect('/');
          return transporter.sendMail({
            to: email,
            from: 'shop@node-cmp.com',
            subject: 'Signup succeeded!',
            html: '<h1>You successfully signed up!<h1>'
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};