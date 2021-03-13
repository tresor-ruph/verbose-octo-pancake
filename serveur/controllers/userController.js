
const { userServices } = require('../use_cases');

module.exports = () => {
  const listAllUsers = async function (req, res) {
    const response = await userServices.fetchAll()
    res.status(200).send(JSON.stringify(response, null, 2))
  }


  const getUser = async (req, res) => {
    console.log(req.params)
    const request = req.params.username
    const response = await userServices.fetchOne(request)

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
    const response = await userServices.deleteUser(request)
    if (response === -1) {
      res.status(400).send(JSON.stringify({ message: 'invalid request' }))
      return
    } else if (response === 0) {
      res.status(404).send(JSON.stringify({ message: 'An error occured' }))
      return
    }
    res.status(200).send(JSON.stringify({message:"user deleted"}))
  }


  const createUser = async (req, res) => {
    const response = await userServices.create(req)
    console.log(response)
    if (response == -1) {
      //user exist
      res.status(404).send(JSON.stringify({ message: 'An error occured' }))
      return
    }
    if (response.code) {
      res.status(400).send(JSON.stringify({ message: response.message }))
      return

    }
    res.status(200).send(JSON.stringify(response))

  }


  const updateUser = async (req, res) => {
    const request = req
    const response = await userServices.update(request)
    if (response == -1) {
      res.status(404).send(JSON.stringify({ message: 'An error occured' }))
      return
    }
    if (response.code) {
      res.status(400).send(JSON.stringify({ message: response.message }))
      return

    }
    console.log(response)
    res.status(200).send(JSON.stringify({message: 'user updated'}))

  }

  return ({ listAllUsers, getUser, deleteUser, createUser, updateUser })

}

