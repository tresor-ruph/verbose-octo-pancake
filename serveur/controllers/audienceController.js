
const { audienceServices } = require('../use_cases');
const dotenv = require('dotenv');
dotenv.config()

module.exports = () => {

  

  const getParticipant = async (req, res) => {
    const response = await audienceServices.getParticipant(req)
    res.status(200).send(JSON.stringify(response))

  }


  const addParticipant = async (req, res) => {

    const response = await audienceServices.addParticipant(req)
    res.status(200).send(JSON.stringify(response))

  }

  

  const updateIndex = async (req, res) => {
    const response = await audienceServices.updateIndex(req)

    if (response == 0) {
      res.status(404).send(JSON.stringify({ message: 'an error occured' }))
      return
    }
  
    res.status(200).send(JSON.stringify({ message: 'index updated' }))

  }

  return ({ getParticipant, addParticipant,updateIndex })

}

