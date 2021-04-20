

module.exports = (pollId,question,answers) => {
  return ({
    pollId: pollId,
    question: question,
    answers:answers,
    createdAt: "",
    updatedAt: "",
  })
}