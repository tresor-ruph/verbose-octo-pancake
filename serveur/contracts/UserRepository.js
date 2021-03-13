module.exports = {

  getAllUsers: async function (Usermodel) {
    const users = await Usermodel.findAll()
    return users
  },
  getOneUser: async function (param, Usermodel) {

    const user = await Usermodel.findAll({
      where: {
        userName: param
      }
    })
    return user
  },
  removeUser: async function (param, Usermodel) {

    const user = await Usermodel.destroy({
      where: {
        userName: param
      }
    })
  return user
  },

  addUser: async function (userObject, Usermodel) {
    const user = await Usermodel.create(userObject)
    return user.dataValues.UserId
  },
  
  updateUser: async function (userObject, Usermodel) {
    const user = await Usermodel.update({
      password: userObject.password
    },
      {
        where:
        {
          username: userObject.username
        }
      })
    if (user[0] == 0) {
      return { message: "could not update" }
    }
    return { message: "data updated" }
  },

}