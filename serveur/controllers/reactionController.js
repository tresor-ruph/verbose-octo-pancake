const { reactionServices } = require('../use_cases');
const dotenv = require('dotenv');
dotenv.config()

module.exports = () => {
const newReaction = async (req, res) => {
  const response = await reactionServices.createReaction(req)

  if (response === "access_D") {
    res.status(403).send(JSON.stringify({ message: response.message }))
    return
  } else if (response.code) {
    res.status(401).send(JSON.stringify({ message: response.message }))
    return
  }
  res.status(200).send(JSON.stringify(response))

}

return ({ newReaction })
}