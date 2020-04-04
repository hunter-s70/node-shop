const express = require('express');
const AuthController = require('../controller/auth');

const router = express.Router();

router.get('/login', AuthController.getLoginPage);

router.get('/signup', AuthController.getSignup);

router.post('/login', AuthController.postLogin);

router.post('/signup', AuthController.postSignup);

router.post('/logout', AuthController.postLogout);

module.exports = router;
