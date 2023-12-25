const express = require('express');
const router = express.Router();
const borrowing_controller = require('../controller/borrowingController');


router.get('/al', borrowing_controller.listBorrowing);
router.get('/:userId', borrowing_controller.getBorrowing);
router.delete('/:id', borrowing_controller.deleteBorrowing);
router.put('/', borrowing_controller.updateBorrowing);
router.post('/', borrowing_controller.addBorrowing);
router.put('/:id', borrowing_controller.returnBorrowing);

module.exports = router;
