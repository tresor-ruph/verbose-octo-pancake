
const User = require('./user')
const Event = require('./event')
const Polls = require('./polls')
const Reactions = require('./reactions')
const Questions = require('./questions')
const Slides = require('./slides')
const Options = require('./options')
const Ranking = require('./ranking')
const Data = require('./data')
const Comment = require('./comments')
const SurveyResult = require('./SurveyResult')

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
Polls.hasMany(Ranking, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Ranking.belongsTo(Polls, {
    foreignKey: {
        allowNull: true
    }
})

Questions.hasMany(Options, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Options.belongsTo(Questions, {
    foreignKey: {
        allowNull: true
    }
})

Questions.hasMany(SurveyResult, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
SurveyResult.belongsTo(Questions, {
    foreignKey: {
        allowNull: true
    }
})

Reactions.hasMany(Data, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Data.belongsTo(Reactions, {
    foreignKey: {
        allowNull: true
    }
})
Reactions.hasMany(Comment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
Comment.belongsTo(Reactions, {
    foreignKey: {
        allowNull: true
    }
})

Slides.belongsToMany(Event, { through: 'Slides_Event' })
Event.belongsToMany(Slides, { through: 'Slides_Event' })


module.exports = {
    User,
    Event,
    Polls,
    Reactions,
    Questions,
    Slides,
    Options,
    Ranking,
    Data,
    Comment,
    SurveyResult
    // Data
}