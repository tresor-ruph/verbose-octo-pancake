import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function StartReaction({ show, duration, setDuration, setShow, voteFreq, setVoteFreq, handleStartEvent, delay, setDelay }) {
    console.log('show', show)
    const footer = (
        <div style={{ marginRight: '10vw' }}>
            <Button className="p-button-danger" style={{ width: '10vw', marginBottom: '10px' }} onClick={() => setShow(false)}>cancel</Button>
            <Button style={{ width: '10vw' }} onClick={() => handleStartEvent()}> start Event</Button>
        </div>
    );
    const header = (
        <div >
            <FontAwesomeIcon icon='cog' color='gray' />
            <span className='config-title'>Configuration</span>
            <hr />
        </div>
    )
    return (
        <Dialog header={header} visible={show} showHeader={false} footer={footer} visible={true} style={{ width: '30vw' }} modal closable={false} onHide={() => hide(false)}  >
            <div className='p-d-flex p-jc-center ' style={{ marginTop: '5vh' }}>
                <div>
                    <div className="p-field p-col-12 p-md-8">
                        <label htmlFor="minmax-buttons">Event duration (min)</label>
                        <InputNumber inputId="minmax-buttons" value={duration} onValueChange={(e) => setDuration(e.value)} mode="decimal" showButtons step={10} min={30} max={240} />
                        
                    </div>
                    <div className="p-field p-col-12 p-md-8">
                        <label htmlFor="minmax-buttons-vote">Votes per users</label>
                        <InputNumber inputId="minmax-buttons-vote" value={voteFreq} onValueChange={(e) => setVoteFreq(e.value)} mode="decimal" showButtons  min={3} max={24} />
                    </div>
                    <div className="p-field p-col-12 p-md-8">
                        <label htmlFor="minmax-buttons-vote">frequency(ms)</label>
                        <InputNumber inputId="minmax-buttons-vote" value={delay} onValueChange={(e) => setDelay(e.Modalvalue)} mode="decimal" showButtons step={1000} min={2000} max={10000} />
                    </div>
                </div>
            </div>
        </Dialog>

    );
}

export default StartReaction