const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/cross-stitch', require('./cross-stitch'))

module.exports = router;