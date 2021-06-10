
const { Reactions } = require('../database/models')
const { Op } = require("sequelize")

module.exports = () => {

    const addReaction = async function (data) {

        const newPoll = await Reactions.create({
            audienceNumber: data.audienceNumber,
            waitingTime: data.voteFreq,
            EventEventId: data.eventId
        })
        return newPoll
    }
    const getReaction = async function (param) {

 
          reactions = await Reactions.findAll({
            where: {
            EventEventId: param
            }
          })

        return reactions
      }

    return ({ addReaction,getReaction })
}