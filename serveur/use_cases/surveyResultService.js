const surveyResultModel = require('../domain/surveyResult')
const { SurveyResultRepo } = require('../repository')
const tokenManager = require('../security/AccessTokenManager')

const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {

    const create = async (request) => {

        let decodedToken = tokenManager.decode(request)
        if (decodedToken.error) {
            return "access_D"
        }
        if(request.body=== null || request.body === undefined){
            return { code: -1, message: validMod.error[0].message }
        }
        let values = Object.values(request.body[0])
        const validMod = surveyResultModel(...values)
        if (validMod.error) {
            return { code: -1, message: validMod.error[0].message }
        }

        let response = await SurveyResultRepo.create(request.body)
            return { response }
         

    }


    return ({ create })

}