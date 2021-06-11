import React, { useEffect, useState } from 'react'

import { Line } from 'react-chartjs-2'


const ReactionGraph = ({ dataSet }) => {

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
            <div className='poll-graph-div line-graph ' >
                <Line data={chartData} options={options} />
               
            </div>
        </div>
    )
}

export default ReactionGraph