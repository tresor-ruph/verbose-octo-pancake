
const User = require('./user')
const Event = require('./event')
const Polls = require('./polls')
const Reactions = require('./reactions')
const Questions = require('./questions')
const Slides = require('./slides')
const Data = require('./data')

User.hasMany(Event, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Event.belongsTo(User, {
    foreignKey: {
        allowNull: true
    }
})

Event.hasMany(Polls, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Polls.belongsTo(Event, {
    foreignKey: {
        allowNull: true
    }
})

Event.hasMany(Reactions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Reactions.belongsTo(Event, {
    foreignKey: {
        allowNull: true
    }
})

Polls.hasMany(Questions, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Questions.belongsTo(Polls, {
    foreignKey: {
        allowNull: true
    }
})

Reactions.hasOne(Data, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Data.belongsTo(Reactions, { foreignKey: { allowNull: true } })

Slides.belongsToMany(Event, { through: 'Slides_Event' })
Event.belongsToMany(Slides, { through: 'Slides_Event' })


module.exports = {
    User,
    Event,
    Polls,
    Reactions,
    Questions,
    Slides,
    Data
}