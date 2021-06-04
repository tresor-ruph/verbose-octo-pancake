const Joi = require('joi')


module.exports = (order, question, image, answer,pollId) => {
  const schema = Joi.object({
    order: Joi.number(),
    question: Joi.string().min(3).required(),
    image: Joi.string(),
    answer: Joi.number().required(),
    pollId: Joi.string().min(10).required(),


  })

  const { error, value } = schema.validate({order, question, image, answer,pollId })
  if (error) {
    return { error: error.details }
  }
  return { value: value }

}