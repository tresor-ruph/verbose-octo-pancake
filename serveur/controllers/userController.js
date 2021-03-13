
const userService = require('../use_cases');

module.exports = () => {

  const listAllUsers = async function (req, res) {
    const response = await userService.listAll()
    res.status(200).send(JSON.stringify(response, null, 2))
  }


  const getUser = async (req, res) => {
    console.log(req.params)
    const request = req.params.username
    const response = await userService.getOne(request)

    if (response.length === 0) {
      res.status(404).send(JSON.stringify({ message: 'requested resource not found' }))
      return
    } else if (response === -1) {
      res.status(400).send(JSON.stringify({ message: 'invalid request' }))
      return
    }
    res.status(200).send(JSON.stringify(response, null, 2))

  }



  const deleteUser = async (req, res) => {

    const request = req.params.username
    const response = await userService.deleteUser(request)
    if (response === -1) {
      res.status(400).send(JSON.stringify({ message: 'invalid request' }))
      return
    } else if (response === 0) {
      res.status(404).send(JSON.stringify({ message: 'An error occured' }))
      return
    }
    res.send(JSON.stringify(response))
  }


  const createUser = async (req, res) => {
    const response = await userService.addUser(req)
    if (response == -1) {
      //user exist
      res.status(404).send(JSON.stringify({ message: 'An error occured' }))
      return
    }
    if (response.code) {
      res.status(400).send(JSON.stringify({ message: response.message }))
      return

    }
    res.send(JSON.stringify(response))

  }


  const updateUser = async (req, res) => {
    const request = req.params.username
    const response = await userService.updateUser(request)
    if (response == -1) {
      res.status(404).send(JSON.stringify({ message: 'An error occured' }))
      return
    }
    if (response.code) {
      res.status(400).send(JSON.stringify({ message: response.message }))
      return

    }
    res.send(JSON.stringify(response))

  }

  return ({ listAllUsers, getUser, deleteUser, createUser, updateUser })

}

