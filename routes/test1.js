const express = require('express');
const router = express.Router();

// path /aroute
router.get('/', (req, res) => {
  res.send('is this working?');
});

module.exports = router;
