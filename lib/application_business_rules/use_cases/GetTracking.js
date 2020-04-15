
module.exports = (trackingId, { trackingRepository }) => {
    return trackingRepository.getTracking(trackingId);
}