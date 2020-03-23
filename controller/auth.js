exports.getLoginPage = (req, res, next) => {
  console.log(req.session);
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    pageTitle: 'Login page',
    path: '/login'
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.pass;
  req.session.isLoggedIn = true;
  res.redirect('/');
};
