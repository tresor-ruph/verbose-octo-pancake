const { Audience } = require('../database/models');
const { Op } = require("sequelize")

module.exports = () => {


  const getParticipant = async function (param) {    
     const participant = await Audience.findAll({
        where: {
          [Op.and]: [{ audAddress: param.params.ip }, { EventEventId: param.params.eventId }]
        }
      })
    return participant
  }

  const addParticipant = async function (userObject) {
    const user = await Audience.create(userObject)
    return user
  }

  const updateIndex = async function (ip,eventId,idx) {
    const poll = await Audience.update({
      questionIndex: idx
    },
      {
        where:
        {
          [Op.and]: [{ pseudo: ip }, { EventEventId: eventId }]

        }
      })
    return poll
  }


  return { getParticipant, addParticipant ,updateIndex}

}