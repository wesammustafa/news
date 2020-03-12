const express = require('express');

const router = express.Router();

router.use('/v1.0/news', require('./v1.0'));

module.exports = router;
