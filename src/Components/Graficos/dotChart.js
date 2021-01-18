import React, { useState, useEffect, useRef } from 'react'
import Chart from 'chart.js';
export default function dotChart(props)
{

    const chartR = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);



    const config = {
        type: "line",
        data: {
            labels: ["Noviembre" ,"Diciembre","Enero", "Febrero", "Marzo"],
            datasets: [
                {
                    label: props.nombre,
                    data: props.data,
                    borderColor:'#c99134',
                    backgroundColor:'#805b1f'
                    
                }
            ]
        },
        options: {
          }

    }




    useEffect(() => {

      if(chartR && chartR.current){

        const newChart = new Chart(chartR.current, config);
        setChartInstance(newChart);
      }

    }, [chartR] )
    
 
    return (
        <div>
        <canvas ref = {chartR} style={{width:'900px', height:'400px',color:'rgb(255,255,255)'}}/>
        </div>
    )


}