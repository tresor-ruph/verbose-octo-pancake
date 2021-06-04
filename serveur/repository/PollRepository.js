const { Polls } = require('../database/models')
const { Op } = require("sequelize")

module.exports = () => {

    const addPoll = async function (data) {
      const newPoll = await Polls.create({
        defaultResultLayout:data.defaultResultLayout,
        timer: data.timer,
        waitingTime:data.waitingTime,
        resultInPercent: data.resultInPercent,
        EventEventId: data.eventId
      })
      return newPoll
    }

    const PollExist= async function(pollId){
      const poll = await Polls.findAll({
           where: {
              pollId: pollId
           }
       })
       return poll
   }
   const questionIndex = async function (id,idx) {
    const poll = await Polls.update({
      questionIndex: idx
    },
      {
        where:
        {
          pollId: id
        }
      })
    return poll
  }

    // const getOneEvent= async function(code, userId){
    //    const event = await Event.findAll({
    //         where: {
    //             [Op.and]:[{code: code}, {UserUserId: userId}]
    //         }
    //     })
    //     return event
    // }

    return ({addPoll, PollExist,questionIndex})
}