const jwt = require('jsonwebtoken')
module.exports = {

  encode: async (user) => {

    const token = await jwt.sign(user, 'secretKey')
    return token
  },

  decode: (request) => {

    const bearerHeader = request.headers['authorization']
    
    if (bearerHeader !== undefined) {
      const bearer = bearerHeader.split(' ');

      try {
    
        const decoded = jwt.verify(bearer[1], 'secretKey')
        return decoded
      }
      
      catch (error) {
        return ({ error: 'accessDenied' })

      }

    }
    return ({ error: 'accessDenied' })


  }
}