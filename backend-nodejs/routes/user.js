const express = require('express');
const router = express.Router();
const user_controller = require('../controller/userController');

/**
 * @swagger
 * /login/a:
 *   get:
 *     summary: Returns a hello message
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           text/plain:
 *             example: Hello, World!
 */
router.post('/token', user_controller.getToken);
router.get('/', user_controller.listUsers);
router.get('/{id}', user_controller.getUser);
router.delete('/:id', user_controller.deleteUser);
router.put('/', user_controller.updateUser);
router.post('/', user_controller.addUser);

module.exports = router;
