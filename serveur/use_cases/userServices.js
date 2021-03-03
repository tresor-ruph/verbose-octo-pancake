// const { userRepository } = require('../contracts')
// const User = require('../domain/Users')
// const user = require('../infrastructure/orm/models/user')


module.exports = (userRepository) => {
  const fetchAll = () =>  userRepository.getAll()

  return { fetchAll }
}