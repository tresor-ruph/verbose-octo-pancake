const Joi = require('joi')


module.exports = (optionText, vote, QuestionQuestionId) => {
  const schema = Joi.object({    
    optionText: Joi.string().required(),
    vote: Joi.number(),
    QuestionQuestionId: Joi.string()
  })

  const { error, value } = schema.validate({optionText, vote, QuestionQuestionId })
  if (error) {
    return { error: error.details }
  }
  return { value: value }

}