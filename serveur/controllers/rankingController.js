const { rankingServices } = require('../use_cases');
const dotenv = require('dotenv');
dotenv.config()

module.exports = () => {
    const create = async (req, res) => {
        const response = await rankingServices.create(req)
         if (response === "access_D") {
            res.status(403).send(JSON.stringify({ message: response.message }))
            return
        }else if(response.code){
            res.status(401).send(JSON.stringify({ message: response.message }))
            return
        }
        res.status(200).send(JSON.stringify(response))
    }

    const getRanks = async (req, res) => {
        const response = await rankingServices.getRanks(req)
       
        if (response.length === 0) {
          res.status(404).send(JSON.stringify({ message: 'requested resource not found' }))
          return
        }
    
        else if (response === -1) {
          res.status(400).send(JSON.stringify({ message: 'invalid request' }))
          return
        }
    
        res.status(200).send(JSON.stringify(response))
      }

    return ({ create,getRanks })

}