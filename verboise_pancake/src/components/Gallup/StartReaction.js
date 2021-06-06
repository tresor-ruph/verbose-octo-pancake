const StartReaction = ({ setVoteFreq, handleStartEvent, voteFreq }) => {




    return (
        <div>
            <div><input type='number' value={voteFreq} onChange={(event) => setVoteFreq(event.target.value)} /></div>
            <div><button onClick={() => handleStartEvent()} > Start event</button></div>
        </div>
    )

}

export default StartReaction