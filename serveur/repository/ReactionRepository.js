
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

    return ({ addReaction })
}