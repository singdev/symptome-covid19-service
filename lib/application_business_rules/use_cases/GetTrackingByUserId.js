module.exports = (userId, { trackingRepository }) => {
    return trackingRepository.findTrackingByUser(userId);
}