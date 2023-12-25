const express = require('express');
const router = express.Router();
const book_controller = require('../controller/bookController');

router.get('/', book_controller.listBook);
router.get('/:title', book_controller.getBookByTitle);
router.get('/bookId/:bookId', book_controller.getBookById);
router.delete('/:id', book_controller.deleteBook);
router.put('/', book_controller.updateBook);
router.post('/', book_controller.addBook);

module.exports = router;
