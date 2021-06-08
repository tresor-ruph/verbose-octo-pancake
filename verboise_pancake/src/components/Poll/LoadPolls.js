
import { useState } from 'react'
import NewPoll from './NewPoll'
import Polls from './Polls'

const LoadPolls = ({code}) => {

    const [startSurvey, setStartSurvey] = useState(false)
    const handleStartEvent = () => {
        setStartSurvey(true)
        
    }

    return (
        <div>
            {
                startSurvey ? <Polls code={code}/> : <NewPoll handleStartEvent={handleStartEvent} />
            }
        </div>
    )



}

export default LoadPolls