const { User } = require('../database/models');
const {Op} = require("sequelize")

module.exports = () => {

  const getAllUsers = async function () {
    const users = await User.findAll()
    return users
  }


  const getOneUser = async function (param) {

    const user = await User.findAll({
      where: {
       [Op.or]:[{userName: param},{email:param}]
      }
    })
    return user
  }

  const userExist = async function (email, userName) {

    const user = await User.findAll({
      where: { 
        [Op.or]: [{ email: email}, {username: userName }]
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


  return { getAllUsers, getOneUser,userExist, removeUser, addUser, updateUser }

}