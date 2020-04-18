function getCurrentDayIndex(firstDate){
    const currentDate = new Date();

    return currentDate.getDate() - firstDate.getDate();
}

module.exports = async ( trackingId, symptom, { trackingRepository }) => {

    const tracking = await trackingRepository.getTracking(trackingId);
    const index = getCurrentDayIndex(tracking.firstDate);

    console.log(index);
    tracking.days[index] = symptom;
    return trackingRepository.updateTracking(trackingId, tracking);
}
