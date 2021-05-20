
import { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Stepper from 'react-stepper-horizontal'
import { useSelector } from 'react-redux'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import './eventModal.scss'

const EventModal = ({ show, hide }) => {

    const eventState = useSelector(state => state.EventReducer.event)

    const [step, setStep] = useState(0)
    const [stepError, setStepError] = useState(false)
    const [stepMessage, setStepMessage] = useState('')

    const nextStep = () => {
        // console.log(eventState)
        if (step === 0) {
            if (eventState.title === "" || eventState.eventType === "") {
                setStepError(true)
                setStepMessage('An error occured')
                return
            } else {
                setStepError(false)

                setStep(prev => prev + 1);

            }
        } else if (step === 1) {
            if (eventState.defaultResultLayout === "" || eventState.mode === "" || eventState.options.length === 0 || eventState.question.length === 0) {
                setStepError(true)
                setStepMessage('An error occured')

                return
            } else {
                setStepError(false)
               setStep(prev => prev + 1);
            }
        }


    }
    const previouseStep = () => {
        setStep(prev => prev - 1)
    }
const finish = () => {
    
}
    const renderStep = () => {
        if (step === 0) {
            return <Step1 />
        } else if (step === 1) {
            return <Step2 />
        } else if (step === 2) {
            return <Step3 />
        }
    }

    const ValidateStep = (x) => {
        if (x === 0) {
            if (eventState.title === "" || eventType === "") {
                return false
            } else return true
        }
        else if (x === 1) {
            if (eventState.defaultResultLayout === "" || eventState.mode === "" || eventState.question.length === 0 || eventState.options.length === 0 || eventState.waitingTime === "") {
                return false
            } else return true
        }
    }

    return (
        <div >
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={() => hide(false)} backdrop="static" scrollable={true} dialogClassName="modal-90w" contentClassName='mod-content'>
                <Modal.Header>
                    <div className='modal-event-title'>
                        <Stepper steps={[{ title: 'Event config' }, { title: 'Poll Config' }, { title: 'Step Three' }]} activeStep={step} lineMarginOffset={0} />
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {renderStep()}
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        {stepError && <span style={{color: 'red'}}>{stepMessage}</span>}
                    </div>
                    <Button variant="danger" onClick={() => hide(false)}>
                        close
          </Button>
                 { step !=0 &&  <Button variant="secondary" onClick={() => previouseStep()}>
                        previous
          </Button>}
               { step !=2 ?  <Button variant="primary" onClick={() => nextStep()}>
                        Next
          </Button> :  <Button variant="primary" onClick={() => finish()}>
                        Finish
          </Button>}

                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default EventModal