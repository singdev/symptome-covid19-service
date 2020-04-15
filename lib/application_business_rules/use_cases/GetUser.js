module.exports = (userId, { userRepository}) => {
    return userRepository.get(userId);
}