const express = require('express');
const router = express.Router();
const { doCalculateResponse } = require('../lib');

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/test', (req, res) => {
  const response = doCalculateResponse(req.body.data);
  return res.send(response);
});

module.exports = router;
