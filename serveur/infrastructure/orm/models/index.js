
    const User = require('./user')
    const Event = require('./event')
    User.hasMany(Event, { as: "Events", foreignKey: "eventId" })
    Event.belongsTo(User, { as: "User", foreignKey: "eventId" })

    // const user = User.create({ userId: "265362756576576", email: "tresor@gmail.com", password: "sfsdsd", username: "qsdqsdq" }).catch(err => {
    //     console.log(err)
    // })

    // const event = Event.create({ eventId: "265362756576596", title: "hehejeje", avgScore: 20, audNum: 40 }).catch(err => {
    //     console.log(err);
    // })

// const users =await User.findAll().catch(err => {
//     console.log(err)
// })
// console.log('users', users)


module.exports= {
    User
}