// const { userRepository } = require('../contracts')
const fetchAll = require('./userServices')

module.exports = (userRepository) => {
    const userServices = fetchAll(userRepository);
    return {userServices}
}

