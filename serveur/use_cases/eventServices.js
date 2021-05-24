const eventModel = require('./../domain/Events')
const { EventRepo } = require('../repository')
const tokenManager = require('../security/AccessTokenManager')
const eventCode = require(('../helper/generateEvent'))

const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
    
    const create = async (request) => {
        let decodedToken = tokenManager.decode(request)
        if (decodedToken.error) {
            return "access_D"
        }
        let values = Object.values(request.body)
        const validMod = eventModel(...values)
        if (validMod.error) {
            return { code: -1, message: validMod.error[0].message }

        }
        const eventExist = await EventRepo.eventExist(validMod.value.title)
        if (eventExist.length === 0) {
            let eventLink = eventCode.generateEventCode()
            let response = await EventRepo.addEvent(decodedToken.data, validMod.value, eventLink)
            if (response.length !== 0) {
                return { eventId:response.dataValues.eventId, link: eventLink }
            } else {
                return { code: 0, message: 'an error occured' }
            }
        } else {
            return 0
        }
    }
    const fetchOne = async (req) => {
     
       
        const response = await EventRepo.getOneEvent(req.params.id)
        return response
    }

    const fetchEventPoll = async (req)=> {
      console.log('///////////////////')
      console.log(req.params)
        const response = await EventRepo.getEventPoll(req.params.eventCode, req.params.userId)
        const polls =response[0].dataValues.Polls
        const questions =polls[0].dataValues.Questions

        const event = {
            id:response[0].dataValues.eventId,
            title:response[0].dataValues.title,
            type:response[0].dataValues.eventType,
            code:response[0].dataValues.code,
            status:response[0].dataValues.status,
            createdAt:response[0].dataValues.createdAt
        }
        const poll ={
            id: polls[0].dataValues.pollId,
            layout:polls[0].dataValues.defaultResultLayout,
            time:polls[0].dataValues.waitingTime,
            mode:polls[0].dataValues.Mode,
            questionIndex:polls[0].dataValues.questionIndex,
            createdAt:polls[0].dataValues.createdAt,
        }
        let questionsList =[]
        Array.from(questions).forEach(elt => {
            questionsList.push({id: elt.dataValues.questionId, question:elt.dataValues.question, options: JSON.parse(elt.dataValues.options)})
        })

        const data = {
            event, poll, questions:questionsList
        }

      
        return data
    }

    const startEvent = async (request) => {

        let token = tokenManager.decode(request)
        if (token.error) {
          return "access_D"
        }

        const response = await EventRepo.startEvent(request.body.id,request.body.status)
        return response
      }
      const deleteEvent = async (req) => {
        if (tokenManager.decode(req).error) {
          return "access_D"
        }
    
        const response = await EventRepo.removeEvent(req.id)
        return response
      }

    return ({ create, fetchOne, fetchEventPoll, startEvent,deleteEvent })

}