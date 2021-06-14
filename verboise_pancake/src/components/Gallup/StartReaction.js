import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function StartReaction({ show, duration, setDuration, setShow, voteFreq, setVoteFreq, handleStartEvent, delay, setDelay }) {
    const footer = (
        <div style={{ marginRight: '10vw' }}>
            <Button className="p-button-danger" style={{ width: '10vw', marginBottom: '10px' }} onClick={() => setShow(false)}>Annuler</Button>
            <Button style={{ width: '10vw' }} onClick={() => handleStartEvent()}>Commencer </Button>
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
                        <label htmlFor="minmax-buttons-vote">fréquence du rendu(ms)</label>
                        <InputNumber inputId="minmax-buttons-vote" value={delay} onValueChange={(e) => setDelay(e.Modalvalue)} mode="decimal" showButtons step={1000} min={2000} max={10000} />
                    </div>

                    <div className="p-field p-col-12 p-md-8">
                        <label htmlFor="minmax-buttons-vote">Frequences des votes (ms)</label>
                        <InputNumber inputId="minmax-buttons-vote" value={voteFreq} onValueChange={(e) => setVoteFreq(e.value)} mode="decimal" showButtons />
                    </div>

                </div>
            </div>
        </Dialog>

    );
}

export default StartReaction