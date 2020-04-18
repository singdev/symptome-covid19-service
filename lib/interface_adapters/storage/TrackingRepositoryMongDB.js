const TrackingRepository = require('../../application_business_rules/repositories/TrackingRepository');

const Tracking = require('../../frameworks_drivers/database/models/TrackingModel');

module.exports = class extends TrackingRepository {

    async persist(tracking){
        const document = new Tracking(tracking);
        const newTracking = await  document.save();
        return newTracking;
    }

    async getTracking(trackingId){
        const tracking = await Tracking.findOne({ _id: trackingId });
        return tracking;
    }

    async findTrackingByUser(userId){
        const trackings = await Tracking.find({ userId: userId });
        return trackings;
    }

    async updateTracking(trackingId, tracking){
        const update = await Tracking.findOneAndUpdate({_id: trackingId}, tracking);
        return update;
    }
}