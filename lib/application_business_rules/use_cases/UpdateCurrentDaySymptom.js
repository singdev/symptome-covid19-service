function getCurrentDayIndex(firstDate){
    const currentDate = new Date();

    return currentDate.getMilliseconds() - firstDate.getMilliseconds();
}

module.exports = async ( trackingId, symptom, { trackingRepository }) => {

    const tracking = await trackingRepository.getTracking(trackingId);

    const index = getCurrentDayIndex();

    tracking.days[index] = symptom;

    trackingRepository.updateTracking(tracking);
    
}
