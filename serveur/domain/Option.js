const Joi = require('joi')


module.exports = (order, optionText, questionId) => {
  const optionTextValid = (value, helpers) => {
    if (value.length > 0) {
      return value
    } else {
      throw new Error('invalid event type')
    }
  }
  
  const schema = Joi.object({
    order: Joi.number(),
    optionText: Joi.custom(optionTextValid,'custom validation'),
    questionId: Joi.string().min(10).required(),


  })

  const { error, value } = schema.validate({order, optionText, questionId })
  if (error) {
    return { error: error.details }
  }
  return { value: value }

}