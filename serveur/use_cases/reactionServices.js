const reactionModel = require('./../domain/Reactions')
const { ReactionRepo } = require('../repository')
const tokenManager = require('../security/AccessTokenManager')
const { EventRepo } = require('../repository')

const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {
    const createReaction = async (request) => {
        let decodedToken = tokenManager.decode(request)
        if (decodedToken.error) {
            return "access_D"
        }
        let values = Object.values(request.body)
        const validMod = reactionModel(...values)
        if (validMod.error) {
            return { code: -1, message: validMod.error[0].message }
        }

        const eventExist = await EventRepo.eventExist(validMod.value.eventId)
        if (eventExist.length != 0) {
            let response = await ReactionRepo.addReaction(validMod.value)
            if (response.length !== 0) {
                return { reaction: response.dataValues.pollId }
            } else {
                return { code: 0, message: 'an error occured' }
            }
        } else {
            return { code: 1, message: 'the event does not exist' }
        }
    }

    const getReaction = async (param) => {

    
        const response = await ReactionRepo.getReaction(param)
        return response
    
      }
    
  
    return ({ createReaction,getReaction })

}