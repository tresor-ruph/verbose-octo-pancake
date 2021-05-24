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
        } else if (response === "access_D") {
            res.status(401).send(JSON.stringify({ message: response.message }))
            return
        }
        res.status(200).send(JSON.stringify(response))
    }

    const getEvent = async (req, res) => {

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

    const getEventPoll = async (req, res) => {
        const response = await eventServices.fetchEventPoll(req)
console.log(req)
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
   
    const startEvent = async (req, res) => {
        const response = await eventServices.startEvent(req)
    
        if (response == 0) {
          res.status(404).send(JSON.stringify({ message: 'Event not found' }))
          return
        }
        else if (response == "access_D") {
          res.status(403).send('Access Denied')
          return
        }
    
        res.status(200).send(JSON.stringify({ message: 'status updated' }))
    
      }
      const deleteEvent = async () => {
        const response = await eventServices.deleteEvent(req)

        if (response.code) {
          res.status(400).send(JSON.stringify({ message: response.message }))
          return
        }
    
        else if (response === 0) {
          res.status(404).send(JSON.stringify({ message: 'event not found' }))
          return
        }
    
        else if (response == "access_D") {
          res.status(403).send("Access denied")
          return
        }

        res.status(200).send(JSON.stringify({ message: "event deleted" }))

      }

    return ({ createEvent, getEvent,getEventPoll,startEvent,deleteEvent })

}