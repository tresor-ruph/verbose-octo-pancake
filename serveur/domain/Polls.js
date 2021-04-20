module.exports = (pollId, defaultLayout, waitingTime, resultFormat, questions, eventId) => {
  return ({
    pollId: pollId,
    defaultLayout: defaultLayout,
    waitingTime: waitingTime,
    resultFormat: resultFormat,
    questions: questions,
    eventId: eventId,
    createdAt: "",
    updatedAt: ""
  })
}