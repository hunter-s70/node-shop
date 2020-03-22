const express = require('express');
const AuthController = require('../controller/auth');

const router = express.Router();

router.get('/login', AuthController.getLoginPage);

module.exports = router;
