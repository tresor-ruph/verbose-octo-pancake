import React, { useEffect, useState } from 'react'

import { Line } from 'react-chartjs-2'
import { Button } from 'react-bootstrap';


const ReactionGraph = ({ dataSet }) => {





    // const stoptest = () => {
    //     if (interval != 0) {
    //         clearInterval(interval)

    //     } else {
    //         console.log(' an error occured')
    //     }
    // }
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
            <div >
                <Line data={chartData} options={options} />
                <Button onClick={() => stoptest()}>Stop</Button>
            </div>
        </div>
    )
}

export default ReactionGraph