import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'helper/firebaseConfig'
import firebase from 'firebase';
import 'firebase/firestore';
import { Line } from 'react-chartjs-2'

const ResultGallup = () => {

    const [dataSet, setDataSet] = useState([])
    const eventState = useSelector(state => state.EventReducer.event)
    const [loaded, setLoaded] = useState(false)
    useEffect(async () => {

        console.log('lolo', eventState)
        const snapshot = await firebase.firestore().collection('reaction').doc(eventState.eventId).collection(`${eventState.code}result`).get()
        let values = snapshot.docs.map(doc => doc.data());
        console.log('hmmmm', values)
       setDataSet(values[0].dataSet)
       setLoaded(true)
    },[])
 

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


    return (
        <div>
           {loaded ? <div >
                <Line data={chartData} options={options} />
            </div> : <div><h1>Loaded</h1></div>}
        </div>
    )



}
export default ResultGallup