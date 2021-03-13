const { User } = require('./../infrastructure/orm/models');

module.exports = () => {

  const getAllUsers = async function () {
    const users = await User.findAll()
    return users
  }


  const getOneUser = async function (param) {

    const user = await User.findAll({
      where: {
        userName: param
      }
    })
    return user
  }


  const removeUser = async function (param) {

    const user = await User.destroy({
      where: {
        userName: param
      }
    })
    return user
  }


  const addUser = async function (userObject) {
    const user = await User.create(userObject)
    return user.dataValues.UserId
  }


  const updateUser = async function (userObject) {
    const user = await User.update({
      password: userObject.password
    },
      {
        where:
        {
          username: userObject.username
        }
      })
    return user
  }


  return { getAllUsers, getOneUser, removeUser, addUser, updateUser }

}