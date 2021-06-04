const { Options } = require('../database/models')
const { Op } = require("sequelize")

module.exports = () => {

    const addOption = async function (data) {

        const newOption = await Options.create({
            order: data.order,
            optionText: data.optionText,

            QuestionQuestionId: data.questionId
        })
        return newOption
    }



    return ({ addOption })
}