
import { useState, useRef } from 'react'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';

import axios from 'axios'
import "helper/axiosConfig"

import 'customcss/newEvent.scss'

const NewEvents = ({ hide }) => {

    const [eventName, setEventName] = useState('')
    const [eventType, setEventType] = useState('')
    const [evtNameErr, setEvtNameErr] = useState(false)
    const [eventTypeErr, setEventTypeErr] = useState(false)
    const toast = useRef(null);

    const footer = (
        <div style={{marginRight:'7vw'}}>
            <Button label="cancel" icon="pi pi-times" className='p-button-danger p-button-sm cancel-evt' onClick={() => hide(false)} />
            <Button label="create" icon="pi pi-check" className='p-button-sm save-evt' onClick={() => handleSubmit()} />
        </div>
    );

    const handleEventName = (event) => {
        setEventName(event.target.value)
    }

    const handleSelect = (x) => {

        let allCards = document.getElementsByClassName('p-card')
        Array.from(allCards).forEach(elt => {
            elt.style.backgroundColor = 'white'
        })
        let selectedCard = document.getElementsByClassName(`card-${x}`)
        Array.from(selectedCard)[0].style.backgroundColor = 'rgba(255,0,0,0.2)'
        setEventType(x)
        setEventTypeErr(false)

    }
    const handleEventNameFocus = () => {
        setEvtNameErr(false)
    }

    const handleEventNameBlur = () => {

        if (eventName.length < 3) {
            setEvtNameErr(true)
        } else {
            setEvtNameErr(false)

        }
    }

    const handleSubmit = () => {
        let fieldError = false
        if (eventName === '') {
            setEvtNameErr(true)
            fieldError = true
        }
        if (eventType === '') {
            setEventTypeErr(true)
            fieldError = true
        }
        if (fieldError) return

        const data = {
            title: eventName,
            selected: eventType
        }
        axios.post('/createEvent', data).then(res => {
                toast.current.show({severity:'success', summary: 'Success', detail:'Event created', life: 3000});
                hide('reload')
            
        }).catch(err => {
            console.log(err)

            if(err?.response?.status === 404){
                toast.current.show({severity:'error', summary: 'Error', detail:'Event already exists', life: 5000});
            }else {
                toast.current.show({severity:'error', summary: 'Error', detail:'An error occured', life: 5000});
            }
        })
    }

    return (
        <div >
            
            <Dialog header="Create Event" showHeader={false} footer={footer} visible={true} style={{ width: '50vw' }} modal  closable={false}  onHide={() => hide(false)}>
            <Toast ref={toast} />
                <div>
                    <div className='new-event-body '>
                        <div >
                            <span className="p-float-label">
                                <InputText id="in" value={eventName} className='p-inputtext-md p-d-block p-mb-2 label-eventTitle' onChange={(e) => handleEventName(e)} onBlur={() => handleEventNameBlur()} onFocus={() => handleEventNameFocus()} />
                                <label htmlFor="in" style={{ color: 'gray', fontSize: '1vw' }}>Name</label>
                            </span>
                            {evtNameErr && <small id="in" className="p-error p-d-block">Invalid name.</small>}
                        </div>
                        <div className='evt-type'>
                            <span className='label-evt-type ' style={{ color: 'gray', fontSize: '1vw' }}>Event mode</span>
                        </div>
                        <div className='event-types row'>
                            <Card className='cards card-gallup' >
                                <a className='stretched-link' id='gallup' onClick={() => handleSelect("gallup")}>
                                    <div>
                                        <FontAwesomeIcon color='#888' icon='chart-line' size="2x" />
                                    </div>
                                Gallup
                                </a>
                            </Card>
                            <Card className='cards card-polls'>
                                <a className='stretched-link' onClick={() => handleSelect("polls")}>
                                    <div>
                                        <FontAwesomeIcon color='#888' icon='chart-bar' size="2x" />
                                    </div>
                                Polls
                                </a>
                            </Card>
                            <Card className='cards card-ranking' id='ranking'>
                                <a className='stretched-link' id='gallup' onClick={() => handleSelect("ranking")}>
                                    <div>
                                        <FontAwesomeIcon icon='trophy' color='#888' size="2x" />
                                    </div>
                                Ranking
                                </a>
                            </Card>
                        </div>
                        <div className='event-type-error'>
                            {eventTypeErr && <small id="username2-help" className="p-error p-d-block">Please Select an event mode.</small>}
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
export default NewEvents