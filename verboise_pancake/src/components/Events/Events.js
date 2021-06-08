import { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from "react-bootstrap";
import LoadPolls from 'components/Poll/LoadPolls'
import Reaction from 'components/Gallup/Reaction'


const Events = () => {

    const location = useLocation();
    const history = useHistory()
    const path = location.pathname.split('/')[2]
    const eventState = useSelector(state => state.EventReducer.event)

    const [eventType, setEventType] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (path !== eventState.code) {
            history.push('/Home')
        } else {
            setEventType(eventState.eventType)
            setLoaded(true)

        }

    }, [])

    const returnEvent = () => {
        if (eventType === "polls") {
            return <LoadPolls  code ={eventState.code}/>
        } else if (eventType === "gallup") {
            return <Reaction code={eventState.code}/>
        } else if (eventType === "ranking") {
            return <LoadPolls />
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