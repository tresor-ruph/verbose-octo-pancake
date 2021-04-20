const { Event } = require('../database/models')
const { Op } = require("sequelize")

module.exports = () => {

    const eventExist = async function (title) {
        const event = await Event.findAll({
            where: {
                title: title
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

    return ({eventExist,getOneEvent, addEvent})
}