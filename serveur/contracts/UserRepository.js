
module.exports = {


  getAllUsers: async function (Usermodel) {
    const users = await Usermodel.findAll()
    return users
  },
  getOneUser: async function (req, Usermodel) {
    const params = req.params.id
    const user = await Usermodel.findAll({
      where: {
        email: params
      }
    })
    return user
  },
  removeUser: async function (req, Usermodel) {
    const params = req.params.id
    const user = await Usermodel.destroy({
      where: {
        userName: params
      }
    })
    console.log(user) //number of deleted elements

    return { message: "user deleted" }
  },
  addUser: async function (req, Usermodel) {
    const params = req.body
    // const user = await Usermodel.create({
    //   email: params.email,
    //   password: params.password,
    //   username: params.username,
    //   eventId: null,
    // })
    // return user.dataValues.UserId
    return {message : 'test'}
  },
  updateUser: async function (req, Usermodel) {
    const params = req.body
    const user = await Usermodel.update({
      password: params.password
    },
      {
        where:
        {
          username: params.username
        }
      })
    //user returns de number of updated lines (arr)
    console.log(user)
    return { message: "data updated" }
  },

}