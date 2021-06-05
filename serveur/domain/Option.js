const Joi = require('joi')


module.exports = (order, optionText, questionId) => {
  const schema = Joi.object({
    order: Joi.number(),
    optionText: Joi.string().required(),
    questionId: Joi.string().min(10).required(),


  })

  const { error, value } = schema.validate({order, optionText, questionId })
  if (error) {
    return { error: error.details }
  }
  return { value: value }

}