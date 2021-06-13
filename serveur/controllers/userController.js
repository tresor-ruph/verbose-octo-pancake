
const { userServices } = require('../use_cases');
const dotenv = require('dotenv');
dotenv.config()

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
    if (response.code == -1) {
      res.status(203).send(JSON.stringify({ token: response }))
      return
    }

    if (response.code == -2) {
      res.status(400).send(JSON.stringify({ message: 'invalid identifiers' }))
      return
    }

    res.status(200).send(JSON.stringify(response))

  }


  const updateUser = async (req, res) => {
    const response = await userServices.update(req)

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


  const updatePassword = async (req, res) => {

    const response = await userServices.updatePassword(req)
    if (response == 0) {
      res.status(404).send(JSON.stringify({ message: 'User not found' }))
      return
    }
    else if (response.code) {
      res.status(500).send(JSON.stringify({ message: 'old password not correct' }))
      return
    }
    res.status(200).send(JSON.stringify({ message: 'password updated' }))

  }



  const confirmEmail = async (req, res) => {
    const response = await userServices.confirm(req)

    if (response == -1) {
      res.status(404).send(JSON.stringify({ message: 'Link expired' }))
      return
    }
    if (response.code) {
      res.status(400).send(JSON.stringify({ message: response.message }))
      return

    }

    res.status(200).redirect(`http://localhost:3000/login`)
    // res.status(200).redirect(`https://verbose-pancake-4fb37.web.app/login`) 

  }

  const resendLink = async (req, res) => {

    const request = req
    const response = await userServices.sendLink(request)
    if (response == 0) {
      res.status(404).send(JSON.stringify({ message: 'an error occured' }))
      return
    }


    res.status(200).send(JSON.stringify({ message: 'link send' }))

  }
  const resetPassword = async (req, res) => {

    const response = await userServices.reset(req)
    if (response == 0) {
      res.status(404).send(JSON.stringify({ message: 'an error occured' }))
      return
    } else if (response === -1) {
      res.status(404).send(JSON.stringify({ message: 'user does not exist' }))
      return
    } else if (response === 'error') {
      res.status(403).send(JSON.stringify({ message: 'an error occured' }))
      return
    }


    res.status(200).send(JSON.stringify({ message: 'email send' }))
  }

  const redirectPassword = async (req, res) => {

    const response = await userServices.redirectPassword(req)
    if (response === -1) {
      res.status(200).send(JSON.stringify({ message: 'invalid' }))
      return

    }
    res.status(200).send(JSON.stringify({ message: 'valid', id: response }))

  }
  const authStatus = async (req, res) => {

    const response = await userServices.authStatus(req)
    if (response.code === -1) {
      res.status(200).send(JSON.stringify({ message: 'LOG_OUT' }))
      return

    }
    res.status(200).send(JSON.stringify({ message: 'LOG_IN' }))

  }



  return ({ listAllUsers, getUser, deleteUser, userLogin, createUser, updatePassword, updateUser, confirmEmail, resendLink, resetPassword, redirectPassword, authStatus })

}

