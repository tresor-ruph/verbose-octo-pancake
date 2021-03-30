
const { userServices } = require('../use_cases');

module.exports = () => {

  const listAllUsers = async function (req, res) {

    const response = await userServices.fetchAll()
    res.status(200).send(JSON.stringify(response, null, 2))

  }

  const getUser = async (req, res) => {

    const request = req.params.username
    const response = await userServices.fetchOne(request)

    if (response.length === 0) {
      res.status(404).send(JSON.stringify({ message: 'requested resource not found' }))
      return
    }

    else if (response === -1) {
      res.status(400).send(JSON.stringify({ message: 'invalid request' }))
      return
    }

    res.status(200).send(JSON.stringify(response, null, 2))

  }

  const deleteUser = async (req, res) => {

    const response = await userServices.deleteUser(req)

    if (response.code) {
      res.status(400).send(JSON.stringify({ message: response.message }))
      return
    }

    else if (response === 0) {
      res.status(404).send(JSON.stringify({ message: 'User not found' }))
      return
    }

    else if (response == "access_D") {
      res.status(403).send("Access denied")
      return
    }

    res.status(200).send(JSON.stringify({ message: "user deleted" }))

  }


  const createUser = async (req, res) => {

    const response = await userServices.create(req)
    if (response == 0) {
      //user exist
      res.status(404).send(JSON.stringify({ message: 'User already exist' }))
      return
    }

    if (response.code) {

      res.status(400).send(JSON.stringify({ message: response.message }))
      return

    }

    res.status(200).send(JSON.stringify(response))

  }

  const userLogin = async (req, res) => {

    const response = await userServices.login(req)

    if (response == 0) {
      res.status(404).send(JSON.stringify({ message: 'User does not exist' }))
      return
    }
    if (response == -1) {
      res.status(403).send(JSON.stringify({ message: 'please confirm your email' }))
      return
    }

    if (response.code) {
      res.status(400).send(JSON.stringify({ message: 'invalid identifiers' }))
      return
    }

    res.status(200).send(JSON.stringify({ token: response }))

  }


  const updateUser = async (req, res) => {

    const request = req

    const response = await userServices.update(request)

    if (response == 0) {
      res.status(404).send(JSON.stringify({ message: 'User not found' }))
      return
    }

    else if (response == "access_D") {
      res.status(403).send('Access Denied')
      return
    }

    if (response.code) {
      res.status(400).send(JSON.stringify({ message: response.message }))
      return

    }

    res.status(200).send(JSON.stringify({ message: 'user updated' }))

  }


  const confirmEmail = async (req, res) => {

    const request = req

    const response = await userServices.confirm(request)

    if (response == -1) {
      res.status(404).send(JSON.stringify({ message: 'Link expired' }))
      return
    }
    if (response.code) {
      res.status(400).send(JSON.stringify({ message: response.message }))
      return

    }

    res.status(200).redirect('http://localhost:3000/Login')

  }

  const resendLink = async (req, res) => {

    const request = req

    const response = await userServices.sendLink(request)

    if (response == 0) {
      res.status(404).send(JSON.stringify({ message: 'an error occured' }))
      return
    }


    res.status(200).send(JSON.stringify({message: 'link send'}))

  }

  return ({ listAllUsers, getUser, deleteUser, userLogin, createUser, updateUser, confirmEmail, resendLink })

}

