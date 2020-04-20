const TrackingRepositoryMongoDB = require('../storage/TrackingRepositoryMongDB');
const UserRepositoryMongoDB = require('../storage/UserRepositoryMongoDB');

const CreateTracking = require('../../application_business_rules/use_cases/CreateTracking');
const GetTracking = require('../../application_business_rules/use_cases/GetTracking');
const GetTrackingByUserName = require('../../application_business_rules/use_cases/GetTrackingByUserName');
const GetTrackingByUserId = require('../../application_business_rules/use_cases/GetTrackingByUserId');
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

    async getTrackingByUserId(req, res, next){
        console.log("Get UserById");
        const trackingRepository = new TrackingRepositoryMongoDB();

        if(!req.auth){
            res.sendStatus(401);
            return;
        }

        const userId = req.auth.credentials;
        const tracking = await GetTrackingByUserId(userId, { trackingRepository });

        if (tracking) {
            res.send(tracking);
        } else {
            res.sendStatus(501)
        }
    },

    async getTrackingByUsername(req, res, next){
        const trackingRepository = new TrackingRepositoryMongoDB();
        const userRepository = new UserRepositoryMongoDB();

        if(!req.params.username){
            res.sendStatus(401);
            return;
        }

        const username = req.params.username;
        const tracking = await GetTrackingByUserName(username, { trackingRepository, userRepository });

        if (tracking) {
            res.send(tracking);
        } else {
            res.sendStatus(501)
        }
    },

    async updateTrackingSymptom(req, res, next) {
        const trackingRepository = new TrackingRepositoryMongoDB();

        const symptom = req.body;
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