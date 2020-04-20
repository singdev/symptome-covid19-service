const router = require('express').Router();

const trackingController = require('../../interface_adapters/controllers/TrackingController');
const authenticationController = require('../../interface_adapters/controllers/AuthorizationController');

router.post('/tracking', authenticationController.verifyAccessToken, trackingController.createTracking);

router.get('/tracking/:id', authenticationController.verifyAccessToken, trackingController.getTracking);

router.put('/tracking/:id', authenticationController.verifyAccessToken, trackingController.updateTrackingSymptom);

router.get('/tracking/search/by-username/:username', trackingController.getTrackingByUsername);

router.get('/tracking/search/by-user', authenticationController.verifyAccessToken, trackingController.getTrackingByUserId);

module.exports = router;