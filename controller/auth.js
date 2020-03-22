exports.getLoginPage = (req, res, next) => {
  console.log(req.get('Cookie'));
  res.render('auth/login', {
    pageTitle: 'Login page',
    path: '/login'
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const pass = req.body.pass;
  res.setHeader('Set-Cookie', 'loggedIn=true');
  res.redirect('/');
};
