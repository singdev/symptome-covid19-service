module.exports = (username, { trackingRepository, userRepository }) => {
    const user = await userRepository.getByUsername(username);
    const userId = user._id;
    return trackingRepository.findTrackingByUser(userId);
}