import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import Reaction from 'components/Gallup/Reaction'
import NewPoll from 'components/Poll/NewPoll'
import Polls from 'components/Poll/Polls'
import PollAnalysis from 'components/Poll/PollAnalysis'
import ResultGallup from "components/Gallup/ResultGallup"
import { ProgressSpinner } from "primereact/progressspinner";



const Events = () => {

    const location = useLocation();
    const history = useHistory()
    const path = location.pathname.split('/')[2]
    const eventState = useSelector(state => state.EventReducer.event)

    const [eventType, setEventType] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [eventStatus, setEventStatus] = useState(false)
    const [eventStart, setEventStart] = useState(false)
    useEffect(() => {
        console.log(eventState)
        if (path !== eventState.code) {
            history.push('/Home')
        } else {
            setEventType(eventState.eventType)
            setLoaded(true)

            setEventStatus(eventState.status)

        }

    }, [eventStart])

    const handleStartEvent = (x) => {
        setEventStart(x)
    }

    const returnEvent = () => {

        if (eventStatus === "Ended") {

            if (eventType === "polls" || eventType === "ranking") {
                return <PollAnalysis />
            } else if (eventType === "gallup") {
                console.log('tyupe')
                return <ResultGallup code={eventState.code} />
            } else {
                console.log('error')
            }
        } else if (eventStatus === "In progress") {
            if (eventType === "polls" || eventType === "ranking") {
                return <Polls code={eventState.code} />
            } else if (eventType === "gallup") {
                return <Reaction ongoing={true} code={eventState.code} />
            } else {
                //------------------implement errors here
                console.log('error')

            }
        }
        else if (eventStatus === "inactive") {
            if (eventType === "polls" || eventType === "ranking") {
                return <NewPoll handleStartEvent={handleStartEvent} />
            } else if (eventType === "gallup") {
                return <Reaction code={eventState.code} />
            } else {
                //------------------implement errors here
                console.log('error')

            }
        }
    }



    return (<div>

        {
            loaded ?
                (<div>
                    {returnEvent()}
                </div>) :
                (
                    <div
                        className="spinner p-d-flex p-jc-center"
                        style={{ marginTop: "40vh" }}
                    >
                        <ProgressSpinner />
                    </div>
                )
        }
    </div>)
}
export default Events