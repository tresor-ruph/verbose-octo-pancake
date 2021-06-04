const Joi = require('joi')

module.exports = (defaultResultLayout, resultInPercent, timer, waitingTime,eventId) => {
  const layout_validator = (value, helpers) => {
    if (value === 'bar-chart' || value === 'pie-chart' || value === 'donut') {
      return value
    } else {
      throw new Error('invalid layout option')
    }
  }

  const schema = Joi.object({

    defaultResultLayout: Joi.string().custom(layout_validator, 'custom validation'),
    resultInPercent: Joi.boolean(),
    timer: Joi.boolean(),
    waitingTime: Joi.number(),
    eventId: Joi.string().min(10).required(),
    


  })

  const { error, value } = schema.validate({  defaultResultLayout,resultInPercent,  timer, waitingTime,   eventId })
  if (error) {
    return { error: error.details }
  }
  return { value: value }
}