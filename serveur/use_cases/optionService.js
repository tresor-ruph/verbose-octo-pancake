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
        let values = Object.values(request.body)
        const validMod = optionModel(...values)
        if (validMod.error) {
            return { code: -1, message: validMod.error[0].message }
        }

        let response = await OptionRepo.addOption(validMod.value)
        if (response.length !== 0) {
            return { response }
        } else {
            return { code: 0, message: 'an error occured' }
        }

    }


    return ({ create })

}