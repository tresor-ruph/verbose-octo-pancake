const assert = require('assert');
const userModel = require('../domain/Users')

const validEmail = ['test@gmail.com', 'test', 'test']
const failedEmail = ['testgmail.test', 'test', 'test']
const validUser = ['test@gmail.com', 'test', 'user']
const failedUser = ['test@gmail.com', 'test', 'us']


describe('usermodel test', () => {
  it('email should return true', () => {
    assert.equal(userModel(...validEmail).error, undefined)
  })

  it('email should return object with error key', () => {
    assert.equal(Object.keys(userModel(...failedEmail))[0], "error")
  })
  it('username should return true', () => {
    assert.equal(userModel(...validUser).error, undefined)
  })

  it('username should return object with error key', () => {
    assert.equal(Object.keys(userModel(...failedUser))[0], "error")
  })

})