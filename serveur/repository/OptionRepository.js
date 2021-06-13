const { Options } = require('../database/models')
const { Op } = require("sequelize")

module.exports = () => {

    const addOption = async function (data) {
       
        const newOption = await Options.bulkCreate(
            data
        )
        return newOption
    }



    return ({ addOption })
}