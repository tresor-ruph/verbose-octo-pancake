import {useEffect} from 'react'
import StepZilla from "react-stepzilla";
import '../../customcss/stepZilla.css'
import { Modal } from 'react-bootstrap'
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'

const EventModal = () => {

  
    const steps =
        [
            { name: 'Step 1', component: <Step1 /> },
            { name: 'Step 2', component: <Step2  /> },
            { name: 'Step 3', component: <Step3 /> },

        ]
    const changeStep = (x) => {
        console.log('step', x)
    }
    return (
        <div className="container bootstrap snippet" >
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={true} >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" >
                        Event Config
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ width: '100%', justifyContent: 'center' }}>
                        <div className='step-progress'>
                            <StepZilla steps={steps} stepsNavigation={true} prevBtnOnLastStep={true} startAtStep={0} showSteps={true} onStepChange={step => {
                                changeStep(step)
                            }} />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


        </div>
    )
}
export default EventModal