const express = require('express');
const router = express.Router();
const message_controller = require('../controller/messageController');


router.get('/', message_controller.listMessage);
router.get('/{id}', message_controller.getMessage);
router.delete('/', message_controller.deleteMessage);
router.put('/', message_controller.updateMessage);
router.post('/', message_controller.addMessage);

module.exports = router;
