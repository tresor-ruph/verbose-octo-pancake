const assert = require('assert');
const userModel = require('../domain/Users')

const validMock= ['test@gmail.com','test', 'test']
const failedMock= ['testgmail.test','test', 'test']


describe('usermodel test', () => {
  it('should return true', () => {
    assert.equal(userModel(...validMock).error, undefined)
  })

  it('should contain the error key', () => {
    assert.equal(Object.keys(userModel(...failedMock))[0], "error")
  })

})