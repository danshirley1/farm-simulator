const express = require('express');
const router = express.Router();
const { doCalculateResponse } = require('../lib');

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/calculate-emissions', async (req, res) => {
  try {
    const result = await doCalculateResponse(req.body.data);
    return res.send(result);
  } catch (err) {
    console.error('An error occured whilst handling request!', err);

    if (err.name === 'InvalidUserSubmissionError') return res.sendStatus(400);
    return res.sendStatus(500);
  }
});

module.exports = router;
