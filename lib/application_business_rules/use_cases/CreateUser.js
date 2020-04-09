
const User = require('../../enterprise_business_rules/entities/User');


module.exports = (username, password, { userRepository}) => {
    const user = new User(username, password);
    return userRepository.persist(user);
}