const Joi = require('joi')

module.exports = (title, type) => {
  const custom_validator = (value, helpers) => {
    if (value === 'polls' || value === 'reactions') {
      return value
    } else {
      throw new Error('nope')
    }
  }

  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    type: Joi.string().custom(custom_validator, 'custom validation')
  })

  const { error, value } = schema.validate({ title: title, type: type })
  if (error) {
    return { error: error.details }
  }
  return { value: value }

}