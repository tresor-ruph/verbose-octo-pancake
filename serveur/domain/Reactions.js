module.exports = (eventId, type, audienceNumber, waitingTime, data) => {
    return ({
        eventId: eventId,
        type: type,
        audienceNumber: audienceNumber,
        waitingTime: waitingTime,
        data: data,
        createdAt: "",
        updatedAt: ""
    })
}