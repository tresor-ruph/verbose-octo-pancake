import {Modal, Button} from 'react-bootstrap'

    function StartReaction({show, duration,setDuration,setShow, voteFreq,setVoteFreq,handleStartEvent,delay,setDelay}) {
    
    return (
        <>

            <Modal
                show={show}
                dialogClassName="modal-90w modal-dialog-scrollable"
                aria-labelledby="example-custom-modal-styling-title"
                animation={false}
            >
                <Modal.Header>
                    <Modal.Title>test</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div> <input type='number' value={duration} onChange={(event) => setDuration(event.target.value)}  placeholder='duration'/></div>
                        <div> <input type='number' value={voteFreq} onChange={(event) => setVoteFreq(event.target.value)}  placeholder='number of votes'/></div>
                        <div> <input type='number' value={delay} onChange={(event) => setDelay(event.target.value)}  placeholder='number of votes'/></div>


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() =>handleStartEvent()}> start Event</Button><Button onClick={() =>setShow(false)}>cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default StartReaction