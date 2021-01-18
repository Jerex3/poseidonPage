import React, { useState, useEffect, useRef } from 'react'
import Chart from 'chart.js';

export default function barChart(props)
{

    const data = props.data;
    const chartR = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);


   

    const config = {
        type: "bar",
        data: {
            labels: props.data[1],
            datasets: [
                {
                    label: 'Dias por cliente',
                    data: props.data[0],
                    borderColor:'#c99134',
                    backgroundColor:'#805b1f'
                    
                }
            ]
        },
        options: {
          }

    }




    useEffect(() => {

      if(chartR && chartR.current)
      {
        const newChart = new Chart(chartR.current,config);
        setChartInstance(newChart);
      }

    }, [chartR])
    
 
    return (
        <div>
        <canvas ref = {chartR} style={{width:'900px', height:'500px',color:'rgb(255,255,255)'}}/>
        </div>
    )


}