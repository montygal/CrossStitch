const express = require('express');
const router = express.Router();

router.use('/cross-stitch', require('./cross-stitch'))

module.exports = router;