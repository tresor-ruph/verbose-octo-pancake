const questionModel = require('./../domain/Questions')
const { QuestionRepo } = require('../repository')
const { PollRepo } = require('../repository')
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
        const validMod = questionModel(...values)
        if (validMod.error) {
            return { code: -1, message: validMod.error[0].message }
        }

        const pollExist = await PollRepo.PollExist(validMod.value.pollId)
        if (pollExist.length != 0) {
            validMod.value.options = JSON.stringify(validMod.value.options)
            let response = await QuestionRepo.addQuestion(validMod.value)
            if (response.length !== 0) {
                return { message: "Questions added" }
            } else {
                return { code: 0, message: 'an error occured' }
            }
        } else {
            return { code: 1, message: 'the Poll does not exist' }
        }
    }


    return ({ create })

}