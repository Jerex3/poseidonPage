import React, { useState, useEffect, useRef } from 'react'
import Chart from 'chart.js';

export default function MaxUmbrella(props) {

    const { rentData, title, ...rest } = props;

    const chartR = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    const config = {
        type: "line",
        data: {
            labels:props.data[1],
            datasets: [
                {
                    label: title,
                    data:props.data[0],
                    borderColor: '#c99134',
                    backgroundColor: '#805b1f'

                }
            ]
        },
        options: {
        }
    }


    useEffect(() => {

        if (chartR && chartR.current) {

            const newChart = new Chart(chartR.current, config);
            setChartInstance(newChart);
        }

    }, [chartR])


    return (
        <div>
            <canvas ref={chartR} style={{ width: '900px', height: '400px', color: 'rgb(255,255,255)' }} />
        </div>
    )
}