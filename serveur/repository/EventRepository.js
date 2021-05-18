const { Event, Polls,Questions  } = require('../database/models')
const { Op } = require("sequelize")

module.exports = () => {

    const eventExist = async function (identif) {
        const event = await Event.findAll({
            where: {
                [Op.or]: [{title: identif}, {eventId: identif}]
            }
        })
        return event
    }
    const addEvent = async function (id, data, code) {
      
      const newEvent = await Event.create({
          title: data.title,
          eventType: data.type,
          UserUserId: id,
          status:'inactive',
          code: code

      })
      return newEvent
    }

    const getOneEvent= async function(code, userId){
       const event = await Event.findAll({
            where: {
                [Op.and]:[{code: code}, {UserUserId: userId}]
            }
        })
        return event
    }

    const getEventPoll= async function(id, userId){
        const event = await Event.findAll({
             where: {
                eventId: id
             },
             include : [
                 {
                     model:Polls,
                     include: [
                         {
                             model: Questions
                         }
                     ]
                     
                 }
             ]
         })
         return event
     }
    

    return ({eventExist,getOneEvent, addEvent, getEventPoll})
}