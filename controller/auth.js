const User = require('../models/user');

exports.getLoginPage = (req, res, next) => {
  console.log(req.session);
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    isLoggedIn: req.session.isLoggedIn,
    pageTitle: 'Login page',
    path: '/login'
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.pass;
  User.findById('5e69551ae411fd1da470ca36')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err) => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};