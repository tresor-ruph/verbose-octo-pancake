const assert = require('assert');
const EventModel = require('../domain/Events')

const validtitle = ['EventTest', 'polls']
const failedtitle = ['ts', 'polls']
const validEventType = ['EventTest', 'gallup']
const failedEventType = ['EventTest', 'wordCloud']


describe('EventMode test', () => {
  it('title should return true', () => {
    assert.equal(EventModel(...validtitle).error, undefined)
  })

  it('title should return object with error key', () => {
    assert.equal(Object.keys(EventModel(...failedtitle))[0], "error")
  })
  it('eventType should return true', () => {
    assert.equal(EventModel(...validEventType).error, undefined)
  })

  it('EventType should return object with error key', () => {
    assert.equal(Object.keys(EventModel(...failedEventType))[0], "error")
  })

})