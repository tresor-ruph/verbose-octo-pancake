const optionModel = require('./../domain/Option')
const { OptionRepo } = require('../repository')
const tokenManager = require('../security/AccessTokenManager')

const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {

    const create = async (request) => {

        console.log('body', request.body)
        let decodedToken = tokenManager.decode(request)
        if (decodedToken.error) {
            return "access_D"
        }
        let values = Object.values(request.body[0])
        const validMod = optionModel(...values)
        if (validMod.error) {
            return { code: -1, message: validMod.error[0].message }
        }

        let response = await OptionRepo.addOption(request.body)
            return { response }
         

    }


    return ({ create })

}