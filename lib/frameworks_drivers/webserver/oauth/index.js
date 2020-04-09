const router = require('express').Router();

const AuthorizationController = require('../../../interface_adapters/controllers/AuthorizationController');

router.post('/oauth/token', AuthorizationController.getAccessToken);

module.exports = router;