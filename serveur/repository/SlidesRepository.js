const { Slides } = require('../database/models')
const { Op } = require("sequelize")

module.exports = () => {

    const create = async function (data) {
       
        const newResult = await Slides.Create(
            data
        )
        return newResult
    }

    const getSlides = async function (id) {

        const user = await Slides.findAll({
          where: {
            PollPollId: id
          }
        })
        return user
    
      }


    return ({ create,getSlides })
}