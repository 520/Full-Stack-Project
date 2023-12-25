const express = require('express');
const router = express.Router();
const history_controller = require('../controller/historyController');


router.get('/al', history_controller.listHistory);
router.get('/:userId', history_controller.getHistory);
router.delete('/:id', history_controller.deleteHistory);
router.put('/', history_controller.updateHistory);
router.post('/', history_controller.addHistory);

module.exports = router;
