const express = require('express');
const router = express.Router();
const fine_controller = require('../controller/fineController');


router.get('/', fine_controller.listFine);
router.get('/{id}', fine_controller.getFine);
router.delete('/', fine_controller.deleteFine);
router.put('/', fine_controller.updateFine);
router.post('/', fine_controller.addFine);

module.exports = router;
