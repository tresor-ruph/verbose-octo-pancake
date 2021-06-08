const eventModel = require('./../domain/Events')
const { EventRepo } = require('../repository')
const tokenManager = require('../security/AccessTokenManager')
const eventCode = require(('../helper/generateEvent'))

const dotenv = require('dotenv');
const { Polls } = require('../database/models');
dotenv.config();

module.exports = () => {

    const create = async (request) => {
        let decodedToken = tokenManager.decode(request)
        if (decodedToken.error) {
            return "access_D"
        }
        let values = Object.values(request.body)
        const validMod = eventModel(...values)
        if (validMod.error) {
            return { code: -1, message: validMod.error[0].message }

        }
        const eventExist = await EventRepo.eventExist(validMod.value.title)
        if (eventExist.length === 0) {
            let eventLink = eventCode.generateEventCode()
            let response = await EventRepo.addEvent(decodedToken.data, validMod.value, eventLink)
            if (response.length !== 0) {
                return { eventId: response.dataValues.eventId, link: eventLink }
            } else {
                return { code: 0, message: 'an error occured' }
            }
        } else {
            return 0
        }
    }
    const fetchOne = async (req) => {


        const response = await EventRepo.getOneEvent(req.params.id)
        return response
    }

    const fetchEventPoll = async (req) => {
        let questions = [];
        let options = []
        let poll = []
        const response = await EventRepo.getEventPoll(req.params.eventCode)
        const polls = response[0].dataValues.Polls
        const questionsList = polls[0].dataValues.Questions
        poll.push({
            id: polls[0].dataValues.pollId,
            layout: polls[0].dataValues.defaultResultLayout,
            timer: polls[0].dataValues.timer,
            waitingTime: polls[0].dataValues.waitingTime,
            resultInPercent: polls[0].dataValues.resultInPercent,
            questionIndex: polls[0].dataValues.questionIndex
        })
        questionsList.forEach(elt => {
            questions.push(
                {
                    id: elt.dataValues.questionId,
                    order: elt.dataValues.order,
                    question: elt.dataValues.question,
                    image: elt.dataValues.image,
                    answer: elt.dataValues.answer,

                }
            )

            elt.dataValues.Options.forEach(elt => {
                options.push(
                    {
                        questionId: elt.dataValues.QuestionQuestionId,
                        order: elt.dataValues.order,
                        optionText: elt.dataValues.optionText
                    }
                )
            })
        })



      

        return { poll, questions, options}
    }

    const getEventResults = async (req) => {
        let questions = [];
        let SurveyResults = []
        let poll = []
        console.log('****************************')
        console.log(req.params)
        const response = await EventRepo.getEventResults(req.params.id)
        const polls = response[0].dataValues.Polls
        const questionsList = polls[0].dataValues.Questions
        poll.push({
            id: polls[0].dataValues.pollId,
            layout: polls[0].dataValues.defaultResultLayout,
            timer: polls[0].dataValues.timer,
            waitingTime: polls[0].dataValues.waitingTime,
            resultInPercent: polls[0].dataValues.resultInPercent,
            questionIndex: polls[0].dataValues.questionIndex
        })
        questionsList.forEach(elt => {
            questions.push(
                {
                    id: elt.dataValues.questionId,
                    order: elt.dataValues.order,
                    question: elt.dataValues.question,
                    image: elt.dataValues.image,
                    answer: elt.dataValues.answer,

                }
            )

            elt.dataValues.SurveyResults.forEach(elt => {
                SurveyResults.push(
                    {
                        questionId: elt.dataValues.QuestionQuestionId,
                        vote: elt.dataValues.vote,
                        optionText: elt.dataValues.optionText,
                        id: elt.dataValues.id,
                    }
                )
            })
        })



      

        return { poll, questions, SurveyResults}
    }



    const startEvent = async (request) => {

        let token = tokenManager.decode(request)
        if (token.error) {
            return "access_D"
        }

        const response = await EventRepo.startEvent(request.body.id, request.body.status)
        return response
    }
    const deleteEvent = async (req) => {

        if (tokenManager.decode(req).error) {
            return "access_D"
        }

        console.log('test', req.params)
        const response = await EventRepo.removeEvent(req.params.id)
        return response
    }

    return ({ create, fetchOne, fetchEventPoll, startEvent, deleteEvent,getEventResults })

}