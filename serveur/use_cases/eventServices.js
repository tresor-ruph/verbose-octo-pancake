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
            // console.log(response)
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
        let decodedToken = tokenManager.decode(req)
        if (decodedToken.error) {
            return "access_D"
        }
        console.log(decodedToken)
        const response = await EventRepo.getOneEvent(req.params.id, decodedToken.data)
        return response
    }

    return ({ create, fetchOne })

}