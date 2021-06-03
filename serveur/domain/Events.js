const Joi = require('joi')

module.exports = (title, type) => {
  const eventType_validator = (value, helpers) => {
    if (value === 'ranking' || value === 'polls' || value === 'gallup') {
      return value
    } else {
      throw new Error('invalid event type')
    }
  }

  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    type: Joi.string().custom(eventType_validator, 'custom validation')
  })

  const { error, value } = schema.validate({ title: title, type: type })
  if (error) {
    return { error: error.details }
  }
  return { value: value }

}