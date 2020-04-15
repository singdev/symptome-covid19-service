const Tracking = require('../../enterprise_business_rules/entities/Tracking');
const Symptom = require('../../enterprise_business_rules/entities/Symptom');

module.exports = async (userId, { trackingRepository }) => {

    const days = [];

    for(let i = 0; i < 14; i++){
        days.push(new Symptom());
    }

    const tracking = new Tracking({
        firstDate: new Date(),
        userId: userId,
        days:  days});

    const newTracking = trackingRepository.persist(tracking);

    return newTracking;
}