const slidesModel = require('./../domain/Slides')
const { slidesRepo } = require('../repository')
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
        const validMod = slidesModel(...values)
        if (validMod.error) {
            return { code: -1, message: validMod.error[0].message }
        }

        let response = await slidesRepo.create(request.body)
            return { response }
         
    }

    const getSlides = async (param) => {

        let decodedToken = tokenManager.decode(request)
        if (decodedToken.error) {
            return "access_D"
        }

        const response = await slidesRepo.getSlides(param)
        return response
    
      }
    




    return ({ create,getSlides })

}