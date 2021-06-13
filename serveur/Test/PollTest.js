const assert = require('assert');
const PollModel = require('../domain/Polls')

const validLayout = ['barChart', 20,'manual', '$qsdqs2337Hbwcwnbxghsdhgqs',2]
const failedLayout = ['barCharts', 20,'manual', '$qsdqs2337Hbwcwnbxghsdhgqs',2]
const validWaitingTime = ['barChart', 20,'manual', '$qsdqs2337Hbwcwnbxghsdhgqs',2]
const failedWaitingTime = ['barChart', '','manual', '$qsdqs2337Hbwcwnbxghsdhgqs',2]
const validMode = ['barChart', 20,'manual', '$qsdqs2337Hbwcwnbxghsdhgqs',2]
const failedMode = ['barChart', 20,'manuals', '$qsdqs2337Hbwcwnbxghsdhgqs',2]
const validEventId = ['barChart', 20,'manual', '$qsdqs2337Hbwcwnbxghsdhgqs',2]
const failedEventId = ['barChart', 20,'manual', 'd',2]
const validQuestionId = ['barChart', 20,'manual', '$qsdqs2337Hbwcwnbxghsdhgqs',2]
const failedQuestionId = ['barChart', 20,'manual', '$qsdqs2337Hbwcwnbxghsdhgqs','']


describe('Polls test', () => {
  it('layout should return true', () => {
    assert.equal(PollModel(...validLayout).error, undefined)
  })

  it('layout should return object with error key', () => {
    assert.equal(Object.keys(PollModel(...failedLayout))[0], "error")
  })
  it('waitingTime should return true', () => {
    assert.equal(PollModel(...validWaitingTime).error, undefined)
  })

  it('waitingTime should return object with error key', () => {
    assert.equal(Object.keys(PollModel(...failedWaitingTime))[0], "error")
  })

  it('pollMode should return true', () => {
    assert.equal(PollModel(...validMode).error, undefined)
  })

  it('pollMode should return object with error key', () => {
    assert.equal(Object.keys(PollModel(...failedMode))[0], "error")
  })
  it('eventId should return true', () => {
    assert.equal(PollModel(...validEventId).error, undefined)
  })

  it('eventId should return object with error key', () => {
    assert.equal(Object.keys(PollModel(...failedEventId))[0], "error")
  })
  it('questionIndex should return true', () => {
    assert.equal(PollModel(...validQuestionId).error, undefined)
  })

  it('questionIndex should return object with error key', () => {
    assert.equal(Object.keys(PollModel(...failedQuestionId))[0], "error")
  })

})