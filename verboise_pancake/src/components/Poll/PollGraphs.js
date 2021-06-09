import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useDispatch, useSelector } from 'react-redux'
import { Bar, Pie, Doughnut } from 'react-chartjs-2'
import { Button, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router'
import './pollGraph.scss'
import axios from 'axios'
import 'helper/axiosConfig'
import 'helper/firebaseConfig'





const PollGraphs = ({ handleNextQuestion, questionIndex, question, handleStopEvent, voteLock, numbVotes, dataSet, handleCloseEvent,defChart, chartLabels, pieChartData }) => {
    const eventState = useSelector(state => state.EventReducer.event)
    const history = useHistory()

    let chartData = {
        datasets: [{
            data: dataSet,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }]
    }
    let chartData2 = {
        labels: chartLabels,
        datasets: [{
            data: pieChartData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
        }]
    }
    const chartOptions = {
        indexAxis: 'x',

        elements: {
            bar: {
                borderWidth: 1,
            },
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



    const renderChart = () => {
        if (defChart === 'bar-chart') {
            return <div style={{ width: '85%', marginTop: '2vh', marginLeft: '3vw' }}> {console.log('biiiiiitchhhhhc',questionIndex )}<Bar key={questionIndex} data={chartData} options={chartOptions} redraw={false}/></div>
        } else if (defChart === 'pie-chart') {
            return <div style={{ width: '45%', marginTop: '5vh', marginLeft: '10vw' }}> <Pie key={questionIndex} data={chartData2} options={chartOptions} redraw={false} /></div>

        } else if (defChart === 'donut') {
            return <div style={{ width: '45%', marginTop: '5vh', marginLeft: '10vw' }}><Doughnut key={questionIndex} data={chartData2} options={chartOptions} redraw ={false}/></div>

        }

    }

    const stopEvent = () => {
        handleStopEvent()

    }

    return (
        <div className='graph-div'>



            <div>
                {renderChart()}
                <div className='row param-div'>
                    <div className='col-3'>
                        {voteLock ? <FontAwesomeIcon icon="lock-open" color='#5F98FA' size='3x' onClick={() => stopEvent()} className='add-option' /> : <FontAwesomeIcon icon="lock" color='#5F98FA' size='3x' />}
                    </div>
                    <div className='col-3'>
                        {questionIndex < question.length - 1 ? <FontAwesomeIcon icon="arrow-alt-circle-right" color='#5F98FA' size='3x' onClick={() => handleNextQuestion()} className='add-option' /> : <Button onClick={() => handleCloseEvent()}> Stop Event</Button>}

                    </div>
                    <div className='col-3'>
                        <div><span className='particip-div'>{numbVotes} /</span><FontAwesomeIcon icon="user-friends" color='gray' size='2x' className='particip-icon' /></div>
                    </div>


                </div>
            </div>
        </div>
    )

}

export default PollGraphs