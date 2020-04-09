const User = require('../../enterprise_business_rules/entities/User');

module.exports = (userId, { userRepository}) => {
    return userRepository.get(userId);
}