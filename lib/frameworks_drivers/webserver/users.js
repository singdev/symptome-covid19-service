const router = require('express').Router();

const UsersController = require('../../interface_adapters/controllers/UsersController');

router.post('/users', UsersController.createUser);

router.get('/users/:id', UsersController.getUser);

module.exports = router;