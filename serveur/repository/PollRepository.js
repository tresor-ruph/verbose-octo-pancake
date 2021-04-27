const { Polls } = require('../database/models')
const { Op } = require("sequelize")

module.exports = () => {

    const addPoll = async function (data) {
      
      const newPoll = await Polls.create({
        defaultResultLayout:data.defaultResultLayout,
        waitingTime:data.waitingTime,
        Mode: data.mode,
        EventEventId: data.eventId
      })
      return newPoll
    }

    // const getOneEvent= async function(code, userId){
    //    const event = await Event.findAll({
    //         where: {
    //             [Op.and]:[{code: code}, {UserUserId: userId}]
    //         }
    //     })
    //     return event
    // }

    return ({addPoll})
}