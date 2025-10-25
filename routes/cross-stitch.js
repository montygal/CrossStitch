const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/cross-stitch');
const validation = require('../middleware/validate');


router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createCrossStitch);

router.put('/:id', contactsController.updateCrossStitch);

router.delete('/:id', contactsController.deleteCrossStitch);

module.exports = router;