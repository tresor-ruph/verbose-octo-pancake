
import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import 'customcss/newEvent.scss'
import axios from 'axios'
import "helper/axiosConfig"

const NewEvents = ({ hide }) => {

    const [eventName, setEventName] = useState('')
    const [eventType, setEventType] = useState('')
    const [evtNameErr, setEvtNameErr] = useState(false)
    const [eventTypeErr, setEventTypeErr] = useState(false)

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
            if (res.status === 200) {
                console.log(res.data)
                hide('reload')
            }
        }).catch(err => {
            console.log(err.response)
        })
    }

    return (
        <div >
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={true} onHide={() => hide(false)} backdrop="static" scrollable={true} dialogClassName="modal-90w" contentClassName='mod-content'>
                <Modal.Header>
                    <div className='modal-event-title'>
                        {/* <span className='new-event-title'>New Event</span> */}
                    </div>
                    <hr />
                </Modal.Header>
                <Modal.Body>

                    <div className='new-event-body'>
                        <div >
                            <span className="p-float-label">
                                <InputText id="in" value={eventName} className='event-input' onChange={(e) => handleEventName(e)} onBlur={() => handleEventNameBlur()} onFocus={() => handleEventNameFocus()} />
                                <label htmlFor="in">Name</label>

                            </span>
                            {evtNameErr && <small id="username2-help" className="p-error p-d-block">Invalid name.</small>}
                        </div>
                        <div className='evt-type'>
                            <span className='label-evt-type ' style={{ color: 'gray', fontSize: '0.80em' }}>Select an event mode</span>
                        </div>
                        <div className='event-types row'>
                            <Card className='cards card-gallup' >
                                <a className='stretched-link' id='gallup' onClick={() => handleSelect("gallup")}>
                                    <div>
                                        <FontAwesomeIcon icon='chart-line' size="2x" />
                                    </div>
                                Gallup
                                </a>
                            </Card>
                            <Card className='cards card-polls'>
                                <a className='stretched-link' onClick={() => handleSelect("polls")}>
                                    <div>
                                        <FontAwesomeIcon icon='chart-bar' size="2x" />
                                    </div>
                                Polls
                                </a>
                            </Card>
                            <Card className='cards card-ranking' id='ranking'>
                                <a className='stretched-link' id='gallup' onClick={() => handleSelect("ranking")}>
                                    <div>
                                        <FontAwesomeIcon icon='trophy' size="2x" />
                                    </div>
                                Ranking
                                </a>
                            </Card>
                        </div>
                        <div className='event-type-error'>
                            {eventTypeErr && <small id="username2-help" className="p-error p-d-block">Please Select an event mode.</small>}
                        </div>
                    </div>








                </Modal.Body>
                <Modal.Footer>

                    <Button variant="danger" onClick={() => hide(false)}>
                        Cancel
          </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Save
          </Button>



                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default NewEvents