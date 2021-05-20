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
    const questionIndex = async (request) => {

        let token = tokenManager.decode(request)
        if (token.error) {
          return "access_D"
        }
        console.log(request.body)

        const response = await PollRepo.questionIndex(request.body.id,request.body.questionIndex)
        return response
      }

    return ({ create,questionIndex })

}