const Joi = require('joi')

module.exports = (audAddress, pseudo,questionIndex, EventEventId) => {
  

  const schema = Joi.object({

    audAddress: Joi.string().min(7),
    pseudo: Joi.string().min(3),
    questionIndex:Joi.number(),
    EventEventId: Joi.string().min(6)

  })

  const { error, value } = schema.validate({  audAddress,pseudo,questionIndex,  EventEventId})
  if (error) {
    return { error: error.details }
  }
  return { value: value }
}