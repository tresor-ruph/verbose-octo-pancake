const { SurveyResult } = require('../database/models')
const { Op } = require("sequelize")

module.exports = () => {

    const create = async function (data) {
       
        const newResult = await SurveyResult.bulkCreate(
            data
        )
        return newResult
    }



    return ({ create })
}