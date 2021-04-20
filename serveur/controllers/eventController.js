const { eventServices } = require('../use_cases');
const dotenv = require('dotenv');
dotenv.config()

module.exports = () => {
    const createEvent = async (req, res) => {
        const response = await eventServices.create(req)
        if (response == 0) {
            res.status(404).send(JSON.stringify({ message: 'event already exist' }))
            return
        }
        if (response.code) {
            res.status(400).send(JSON.stringify({ message: response.message }))
            return
        }
        res.status(200).send(JSON.stringify(response))
    }

    const getEvent = async(req, res)=> {
     
        const response = await eventServices.fetchOne(req)
    
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

    return ({ createEvent, getEvent })

}