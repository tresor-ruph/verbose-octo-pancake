const jwt = require('jsonwebtoken')
module.exports = {

  encode: async (user , time =Math.floor(Date.now() / 1000) + (24*60*60)) => {
    const token = await jwt.sign({ exp: time, data: user }, 'secretKey')
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


  },

  simpleCheck: (val) => {
    try {
      const decoded = jwt.verify(val, 'secretKey')
      return decoded
    }

    catch (error) {
      return ({ error: 'accessDenied' })

    }
  }
}