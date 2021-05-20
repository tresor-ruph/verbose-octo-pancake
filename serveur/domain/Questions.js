const Joi = require('joi')


module.exports = (id, question, options, pollId) => {
  const schema = Joi.object({
    id: Joi.number(),
    question: Joi.string().min(3).required(),
    options: Joi.array().min(2).required(),
    pollId: Joi.string().min(10).required(),


  })

  const { error, value } = schema.validate({id, question, options, pollId })
  if (error) {
    return { error: error.details }
  }
  return { value: value }

}