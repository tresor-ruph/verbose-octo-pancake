
const userService = require('../use_cases');

module.exports = () => {

  const listAllUsers = async function (req, res) {
    const response = await userService.listAll()
    res.send(JSON.stringify(response, null, 2))
  }
  const getUser = async (req, res) => {
    console.log(req.params)
    const request = req.params.username
    const response = await userService.getOne(request)
    res.send(JSON.stringify(response, null, 2))

  }

  const deleteUser = async (req, res) => {
    const request = req.params.username

    const response = await userService.deleteUser(request)
    res.send(JSON.stringify(response))
  }
  const createUser = async (req, res) => {
    const request = req.params.username
    const response = await userService.addUser(request)
    if (response == -1) {
    }
    res.send(JSON.stringify(response))

  }
  const updateUser = async (req, res) => {
    const request = req.params.username
    const response = await userService.updateUser(request)
    res.send(JSON.stringify(response))
  }

  return ({ listAllUsers, getUser, deleteUser, createUser, updateUser })

}

