// const {createUserRepository} = require('./UserRepository')
const model = require('./../infrastructure/orm/models');
module.exports =  {
     
    getAll :async  function () {
     const Users=await model.User.findAll()
    }

 


  
}
