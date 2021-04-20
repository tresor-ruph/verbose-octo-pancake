const Joi = require('joi')

module.exports = (email, password, username) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    username: Joi.string().alphanum().min(3).max(30).required(),

  })

  const { error, value } = schema.validate({ email: email, password: password, username: username })

  if (error) {
    return { error: error.details }
  }
  return { value: value }



}