const { pollServices } = require('../use_cases');
const dotenv = require('dotenv');
dotenv.config()

module.exports = () => {
    const createPoll = async (req, res) => {
        const response = await pollServices.create(req)
         if (response === "access_D") {
            res.status(403).send(JSON.stringify({ message: response.message }))
            return
        }else if(response.code){
            res.status(401).send(JSON.stringify({ message: response.message }))
            return
        }
        res.status(200).send(JSON.stringify(response))
    }
    const questionIndex = async (req, res) => {
        const response = await pollServices.questionIndex(req)
    
        if (response == 0) {
          res.status(404).send(JSON.stringify({ message: 'an error occured' }))
          return
        }
        else if (response == "access_D") {
          res.status(403).send('Access Denied')
          return
        }
    
        res.status(200).send(JSON.stringify({ message: 'index updated' }))
    
      }

   
    return ({ createPoll,questionIndex })

}