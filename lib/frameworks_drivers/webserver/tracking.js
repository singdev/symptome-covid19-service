const router = require('express').Router();

const trackingController = require('../../interface_adapters/controllers/TrackingController');
const authenticationController = require('../../interface_adapters/controllers/AuthorizationController');

router.post('/tracking', authenticationController.verifyAccessToken, trackingController.createTracking);

router.get('/tracking/:id', authenticationController.verifyAccessToken, trackingController.getTracking);

module.exports = router;