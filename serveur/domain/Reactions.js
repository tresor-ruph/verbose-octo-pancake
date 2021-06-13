const Joi = require('joi')


module.exports = (audienceNumber, voteFreq, eventId) => {
    const schema = Joi.object({

        audienceNumber: Joi.number(),
        voteFreq: Joi.number(),
        eventId: Joi.string().min(10).required(),
        
    
    
      })
    
      const { error, value } = schema.validate({  audienceNumber,voteFreq,  eventId})
      if (error) {
        return { error: error.details }
      }
      return { value: value }
}