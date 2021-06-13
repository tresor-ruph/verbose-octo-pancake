const audienceModel = require('./../domain/Audience')
const { AudienceRepo } = require('../repository')

const dotenv = require('dotenv');
dotenv.config();


module.exports = () => {



  const getParticipant = async (param) => {

    const response = await AudienceRepo.getParticipant(param)
    return response
  }


  const addParticipant = async (request) => {
    let values = Object.values(request.body)
    const validMod = audienceModel(...values)

    if (validMod.error) {
      return { code: -1, message: validMod.error[0].message }
    }

      const response = await AudienceRepo.addParticipant(validMod.value)
      return response

  }
  const updateIndex = async (request) => {
    const response = await AudienceRepo.updateIndex(request.body.ip,request.body.eventId,request.body.questionIndex)
    return response
  }




  
  return ({getParticipant, addParticipant,updateIndex  })

}