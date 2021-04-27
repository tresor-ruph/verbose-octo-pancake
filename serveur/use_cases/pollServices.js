const pollModel = require('./../domain/Polls')
const { PollRepo } = require('../repository')
const { EventRepo } = require('../repository')
const tokenManager = require('../security/AccessTokenManager')

const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
    const create = async (request) => {
        let decodedToken = tokenManager.decode(request)
        if (decodedToken.error) {
            return "access_D"
        }
        let values = Object.values(request.body)
        const validMod = pollModel(...values)
        if (validMod.error) {
            return { code: -1, message: validMod.error[0].message }
        }
        console.log('*************************')
        console.log(validMod)
        console.log('******************************')
        const eventExist = await EventRepo.eventExist(validMod.value.eventId)
        if (eventExist.length != 0) {
            let response = await PollRepo.addPoll(validMod.value)
            if (response.length !== 0) {
                return { pollId: response.dataValues.pollId }
            } else {
                return { code: 0, message: 'an error occured' }
            }
        } else {
            return { code: 1, message: 'the event does not exist' }
        }
    }
    // const fetchOne = async (req) => {
    //     let decodedToken = tokenManager.decode(req)
    //     if (decodedToken.error) {
    //         return "access_D"
    //     }
    //     console.log(decodedToken)
    //     const response = await EventRepo.getOneEvent(req.params.id, decodedToken.data)
    //     return response
    // }

    return ({ create })

}