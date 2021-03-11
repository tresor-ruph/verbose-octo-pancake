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
    console.log(user) //number of deleted elements
    if (user === 0) {
      return { message: "could not delete. User not found" }
    }
    return { message: "user deleted" }
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
    //user returns de number of updated lines (arr)
    if (user[0] == 0) {
      return { message: "could not update" }
    }
    return { message: "data updated" }
  },

}