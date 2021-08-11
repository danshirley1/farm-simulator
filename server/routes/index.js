const express = require('express');
const router = express.Router();
const { doCalculateResponse } = require('../lib');

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/test', async (req, res) => {
  const result = await doCalculateResponse(req.body.data);
  return res.send(result);
});

module.exports = router;
