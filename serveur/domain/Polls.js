const Joi = require('joi')

module.exports = (defaultResultLayout, waitingTime, mode, eventId) => {
  const layout_validator = (value, helpers) => {
    console.log(value)
    if (value === 'barChart' || value === 'pieChart') {
      return value
    } else {
      throw new Error('invalid layout option')
    }
  }

  const mode_validator = (value, helpers) => {
    if (value === 'automatic' || value === 'manual') {
      return value
    } else {
      throw new Error('invalid mode option')
    }
  }

  const schema = Joi.object({
    defaultResultLayout: Joi.string().custom(layout_validator, 'custom validation'),
    waitingTime: Joi.number(),
    mode: Joi.string().custom(mode_validator, 'custom validation'),
    eventId: Joi.string().min(10).required()

  })

  const { error, value } = schema.validate({ defaultResultLayout: defaultResultLayout, waitingTime: waitingTime, mode: mode, eventId: eventId })
  if (error) {
    return { error: error.details }
  }
  return { value: value }
}