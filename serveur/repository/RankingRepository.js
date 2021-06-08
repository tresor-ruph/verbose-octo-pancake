const { Ranking } = require('../database/models')
const { Op } = require("sequelize")

module.exports = () => {

    const create = async function (data) {
        console.log('insert data', data)
       
        const newResult = await Ranking.bulkCreate(
            data
        )
        return newResult
    }

    const getRanks = async function (id) {

        const user = await Ranking.findAll({
          where: {
            PollPollId: id
          }
        })
        return user
    
      }


    return ({ create,getRanks })
}