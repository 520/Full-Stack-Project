const express = require('express');
const router = express.Router();
const comment_controller = require('../controller/commentController');


router.get('/', comment_controller.listComment);
router.get('/:bookId', comment_controller.getComment);
router.delete('/', comment_controller.deleteComment);
router.put('/', comment_controller.updateComment);
router.post('/', comment_controller.addComment);

module.exports = router;
