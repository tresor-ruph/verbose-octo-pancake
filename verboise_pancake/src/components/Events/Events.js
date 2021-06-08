import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from "react-bootstrap";
import LoadPolls from 'components/Poll/LoadPolls'
import Reaction from 'components/Gallup/Reaction'
import NewPoll from 'components/Poll/NewPoll'
import Polls from 'components/Poll/Polls'
import PollAnalysis from 'components/Poll/PollAnalysis'



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

            } else {
                //------------------implement errors here
                console.log('error')
            }
        } else if (eventStatus === "In progress") {
            if (eventType === "polls" || eventType === "ranking") {
                return <Polls code={eventState.code} />
            } else if (eventType === "gallup") {

            } else {
                //------------------implement errors here
                console.log('error')

            }
        }
        else if (eventStatus === "inactive") {
            if (eventType === "polls" || eventType === "ranking") {
                return <NewPoll handleStartEvent={handleStartEvent}/>
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
                (<div className="spinner" style={{ marginTop: "40vh" }}>
                    <Spinner
                        animation="border"
                        role="status"
                        variant="primary"
                        size="x-lg"
                    >
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>)
        }
    </div>)
}
export default Events