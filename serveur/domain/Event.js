

module.exports = (eventId,title,avgScore, audNum) => {
  return ({
    eventId:eventId,
    title: title,
    avgScore: avgScore,
    audNum: audNum,
    createdAt: "",
    updatedAt:"",
  })
}