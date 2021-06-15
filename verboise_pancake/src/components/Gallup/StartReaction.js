import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function StartReaction({ show, duration, setDuration, setShow, voteFreq, setVoteFreq, handleStartEvent, delay, setDelay }) {
    const footer = (
        <div style={{ marginRight: '100px' }}>
            <Button className="p-button-danger" onClick={() => setShow(false)}>Annuler</Button>
            <Button onClick={() => handleStartEvent()}>Commencer </Button>
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
        <Dialog header={header} visible={show} showHeader={false} footer={footer} visible={true} style={{ width: '450px' }} modal closable={false} onHide={() => hide(false)}  >
            <div  style={{ marginTop: '5vh', marginLeft: '50px' }}>
                <div style = {{justifyContent: 'center'}}>
                    <div className="p-field  p-md-8">
                        <label htmlFor="minmax-buttons-vote">fréquence de rendu(ms)</label>
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