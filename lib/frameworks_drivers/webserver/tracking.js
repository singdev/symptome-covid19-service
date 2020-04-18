const router = require('express').Router();

const trackingController = require('../../interface_adapters/controllers/TrackingController');
const authenticationController = require('../../interface_adapters/controllers/AuthorizationController');

router.post('/tracking', authenticationController.verifyAccessToken, trackingController.createTracking);

router.get('/tracking/:id', authenticationController.verifyAccessToken, trackingController.getTracking);

router.put('/tracking/:id', authenticationController.verifyAccessToken, trackingController.updateTrackingSymptom);

module.exports = router;