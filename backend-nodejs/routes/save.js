const express = require('express');
const router = express.Router();
const save_controller = require('../controller/saveController');


router.get('/', save_controller.listSave);
router.get('/:userId', save_controller.getSave);
router.delete('/:id', save_controller.deleteSave);
router.put('/', save_controller.updateSave);
router.post('/', save_controller.addSave);

module.exports = router;
