const { Questions } = require('../database/models')
const { Op } = require("sequelize")

module.exports = () => {

    const addQuestion = async function (data) {
        
        const newQuestions = await Questions.create({
            order: data.order,
            question: data.question,
            image:data.image,
            answer:data.answer,
            PollPollId: data.pollId
        })
        return newQuestions
    }

    // const getOneEvent= async function(code, userId){
    //    const event = await Event.findAll({
    //         where: {
    //             [Op.and]:[{code: code}, {UserUserId: userId}]
    //         }
    //     })
    //     return event
    // }

    return ({ addQuestion })
}