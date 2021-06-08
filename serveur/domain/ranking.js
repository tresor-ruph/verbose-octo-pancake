
const Joi = require('joi')

module.exports = (pseudo, points,pollId) => {
  const schema = Joi.object({    
    pseudo: Joi.string().required(),
    points: Joi.number(),
    pollId: Joi.string()
  })

  const { error, value } = schema.validate({pseudo,  points,pollId })
  if (error) {
    return { error: error.details }
  }
  return { value: value }

}