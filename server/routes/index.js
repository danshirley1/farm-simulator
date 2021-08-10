const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/test', (req, res) => {
  console.log('SOME MESSAGE', req);
  return res.send({ foo: 'bar' });
});

module.exports = router;
