module.exports = {
  fetchAll: async (userRepository) => {

    const response = await userRepository.getAll()
    return response
  },
  fetchOne: async (request, userRepository) => {
    const response = await userRepository.getOne(request)
    return response
  },
  create: async (request, userRepository, userModel) => {
    let values = Object.values(request.body)
    console.log(userModel(...values))
    const response = await userRepository.add(request)
    return response
  },
  update: async (request, userRepository) => {
    const response = await userRepository.update(request)
    return response
  },
  deleteUser: async (request, userRepository) => {
    const response = await userRepository.deleteUser(request)
    return response
  },

}