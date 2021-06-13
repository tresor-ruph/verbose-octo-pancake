const rankingModel = require('./../domain/ranking')
const { RankingRepo } = require('../repository')
const tokenManager = require('../security/AccessTokenManager')

const dotenv = require('dotenv');
dotenv.config();

module.exports = () => {

    const create = async (request) => {

        let decodedToken = tokenManager.decode(request)
        if (decodedToken.error) {
            return "access_D"
        }
        let values = Object.values(request.body[0])
        const validMod = rankingModel(...values)
        if (validMod.error) {
            return { code: -1, message: validMod.error[0].message }
        }

        let response = await RankingRepo.create(request.body)
            return { response }
         
    }

    const getRanks = async (request) => {

        let decodedToken = tokenManager.decode(request)
        if (decodedToken.error) {
            return "access_D"
        }

        const response = await RankingRepo.getRanks(request.params.id)
        return response
    
      }
    




    return ({ create,getRanks })

}