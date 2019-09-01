const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>Page for shop here</h1>');
});

module.exports = router;