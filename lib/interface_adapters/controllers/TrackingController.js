const TrackingRepositoryMongoDB = require('../storage/TrackingRepositoryMongDB');
const CreateTracking = require('../../application_business_rules/use_cases/CreateTracking');
const GetTracking = require('../../application_business_rules/use_cases/GetTracking');
const UpdateCurrentDaySymptom = require('../../application_business_rules/use_cases/UpdateCurrentDaySymptom');

module.exports = {

    async createTracking(req, res, next) {
        if (!req.auth) {
            res.sendStatus(401);
            return;
        }

        const userId = req.auth.credentials;
        const trackingRepository = new TrackingRepositoryMongoDB();

        try {
            const newTracking = await CreateTracking(userId, { trackingRepository });

            if (newTracking) {
                res.send({ newTracking })
            } else {
                res.sendStatus(500);
            }
        } catch (err) {
            console.log(err);
            res.sendStatus(403)
        }
    },

    async getTracking(req, res, next) {
        const trackingRepository = new TrackingRepositoryMongoDB();

        if(!req.params.id){
            res.sendStatus(401);
            return;
        }

        const tracking = await GetTracking(req.params.id, { trackingRepository });

        if (tracking) {
            res.send(tracking);
        } else {
            res.sendStatus(501)
        }
    },

    async updateTrackingSymptom(req, res, next) {
        const trackingRepository = new TrackingRepositoryMongoDB();

        const symptom = new symptom(req.body);
        const trackingId = req.params.id;

        if(!trackingId){
            res.sendStatus(401);
            return;
        }

        const tracking = await UpdateCurrentDaySymptom(trackingId, symptom, { trackingRepository });
        if (tracking) {
            res.send(tracking);
        } else {
            res.sendStatus(501)
        }
    }
}