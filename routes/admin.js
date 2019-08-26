const express = require('express');
const router = express.Router();

router.use('/add-product', (req, res, next) => {
  res.send(`
    <h1>Add a product</h1>
    <form action="/admin/product"
          method="post">
      <input type="text"
             name="title" />
      <button type="submit">Add product</button>
    </form>
`);
});

router.post('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;