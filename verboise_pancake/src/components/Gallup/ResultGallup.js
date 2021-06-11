import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'helper/firebaseConfig'
import firebase from 'firebase';
import 'firebase/firestore';
import { Line } from 'react-chartjs-2'
import 'customcss/resultGallup.scss'
import { useHistory } from 'react-router'
import { Button } from 'primereact/button'
import { ProgressSpinner } from "primereact/progressspinner";

const ResultGallup = () => {

    const [dataSet, setDataSet] = useState([])
    const eventState = useSelector(state => state.EventReducer.event)
    const [loaded, setLoaded] = useState(false)

    const history = useHistory()

    useEffect(async () => {

        console.log('lolo', eventState)
        const snapshot = await firebase.firestore().collection('reaction').doc(eventState.eventId).collection(`${eventState.code}result`).get()
        let values = snapshot.docs.map(doc => doc.data());
        console.log('hmmmm', values)
        setDataSet(values[0].dataSet)
        setLoaded(true)
    }, [])


    let chartData = {
        datasets: [{
            data: dataSet

        }]
    }
    const options = {
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }]
        },
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
    };

    const handleRedirect = () => {
        history.push('/Home')
    }

    return (
        <div>
            {loaded ?
                <div >
                    <div className='p-d-flex p-jc-center'>
                        <div className='p-shadow-6 result-line-div'>
                            <Line data={chartData} options={options} />
                        </div>

                    </div>
                    <div className='p-d-flex p-jc-center btn-div'>
                        <Button onClick={() => handleRedirect()} style={{ width: '200px' }}> Home </Button>
                    </div>
                </div>
                :
                <div>
                    <div
                        className="spinner p-d-flex p-jc-center"
                        style={{ marginTop: "40vh" }}
                    >
                        <ProgressSpinner />
                    </div>
                </div>}
        </div>
    )



}
export default ResultGallup